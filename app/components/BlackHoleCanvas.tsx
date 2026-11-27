"use client";

import React, { useRef, useEffect } from "react";
import { MOBILE_QUERY } from "./singularity/engine";

/**
 * BlackHoleCanvas
 *
 * Mounts the tuned WebGPU raymarched black hole (ported from the standalone
 * `webgpu-black-hole` project) into a self-sizing box. It is a *passive* visual:
 * no OrbitControls — the intro dollies the camera from scroll, re-raymarching
 * every frame at native resolution, so the plunge stays sharp.
 *
 * `control` lets the parent drive and pause that camera. `onStatus` reports
 * whether the raymarcher came up at all: without WebGPU there is no black hole,
 * and the intro drops itself rather than showing an empty sky.
 */

export interface BlackHoleControl {
  setPaused: (paused: boolean) => void;
  /** Drive the camera from scroll: progress 0→1 dollies in, px/py add pointer parallax. */
  setCamera: (progress: number, px: number, py: number) => void;
}

// Reference-inspired, nearly edge-on disc: a white-gold approaching edge,
// fine orbiting filaments, and a dark silhouette against lensed background stars.
const BLACK_HOLE_CONFIG = {
  blackHoleMass: 0.6,
  diskInnerRadius: 4.2,
  diskOuterRadius: 13,
  diskTemperature: 9.5,
  temperatureFalloff: 2.1,
  diskBrightness: 2.4,
  diskRotationSpeed: -18,
  turbulenceScale: 3.2,
  turbulenceStretch: 0.55,
  turbulenceSharpness: 2.6,
  turbulenceCycleTime: 5,
  turbulenceLacunarity: 3,
  turbulencePersistence: 0.8,
  diskEdgeSoftnessInner: 0.06,
  diskEdgeSoftnessOuter: 0.35,
  gravitationalLensing: 2.3,
  dopplerStrength: 3.4,
  stepSize: 0.65,
  starsEnabled: true,
  starBackgroundColor: "#000000",
  starDensity: 0.38,
  starSize: 1,
  starBrightness: 2.2,
  nebulaEnabled: false,
  nebula1Scale: 2,
  nebula1Density: 0.5,
  nebula1Brightness: 0.01,
  nebula1Color: "#071f44",
  nebula2Scale: 5.5,
  nebula2Density: 0.05,
  nebula2Brightness: 0.21,
  nebula2Color: "#010615",
};

const BLOOM = { strength: 0.2, radius: 0.08, threshold: 1.2 };

interface Props {
  control?: React.MutableRefObject<BlackHoleControl | null>;
  /** Called once with whether the raymarcher is running. */
  onStatus?: (ready: boolean) => void;
}

const BlackHoleCanvas: React.FC<Props> = ({ control, onStatus }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onStatusRef = useRef(onStatus);
  onStatusRef.current = onStatus;

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any = null;
    let observer: ResizeObserver | null = null;

    async function init() {
      const container = containerRef.current;
      if (!container) return;

      if (!navigator.gpu) {
        onStatusRef.current?.(false);
        return;
      }

      try {
        const THREE = await import("three/webgpu");
        const { pass } = await import("three/tsl");
        const { bloom } = await import(
          "three/examples/jsm/tsl/display/BloomNode.js"
        );
        const { BlackHoleSimulation } = await import(
          "./blackhole/BlackHoleSimulation"
        );

        if (cancelled) return;

        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        const mobile = window.matchMedia(MOBILE_QUERY).matches;

        // Render extra detail on high-density displays while bounding the
        // per-pixel raymarch cost on phones. The dolly is rendered, never enlarged.
        renderer = new THREE.WebGPURenderer({ antialias: false });
        renderer.setSize(w, h);
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, mobile ? 1.5 : 2)
        );
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        Object.assign(renderer.domElement.style, {
          width: "100%",
          height: "100%",
          display: "block",
        });
        container.appendChild(renderer.domElement);

        await renderer.init();
        if (cancelled) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);

        // Stay just above the disc plane, like the reference's forward flight.
        // Start at the reference's close view: the disc spans most of a wide
        // screen. Portrait keeps its central silhouette with the outer disc
        // extending toward the edges. The existing plunge curve stays intact.
        const startingDistance = () => Math.max(17, 15.5 / camera.aspect);
        let camProgress = 0;
        let camPx = 0;
        let camPy = 0;

        const simulation = new BlackHoleSimulation(scene, BLACK_HOLE_CONFIG);
        simulation.createBlackHole();
        simulation.onResize(w, h);

        const applyCamera = () => {
          // The parent supplies squared scroll progress. Exponential distance
          // makes the horizon grow continuously, then pass around the camera,
          // within the existing 2.1-second navigation (no extra timeline).
          const p = Math.sqrt(Math.max(0, Math.min(1, camProgress)));
          const approach = Math.min(1, p / 0.88);
          const distance = startingDistance() * Math.pow(0.036, approach);
          const parallax = (1 - approach) * 0.35;
          camera.position.set(
            camPx * parallax,
            -distance * (0.14 - approach * 0.08) + camPy * parallax * 0.3,
            distance
          );
          camera.lookAt(0, 0, 0);
          const u = simulation.uniforms;
          if (u) {
            u.cameraFovScale.value = 1.45 - approach * 0.12;
            u.cameraRoll.value = -0.035 + approach * 0.09;
          }
        };
        applyCamera();

        // Bloom post-processing (matches the standalone's tuned look)
        const post = new THREE.PostProcessing(renderer);
        const scenePass = pass(scene, camera);
        const scenePassColor = scenePass.getTextureNode();
        const bloomPass = bloom(scenePassColor);
        bloomPass.threshold.value = BLOOM.threshold;
        bloomPass.strength.value = BLOOM.strength;
        bloomPass.radius.value = BLOOM.radius;
        post.outputNode = scenePassColor.add(bloomPass);

        const clock = new THREE.Clock();
        // Cap the raymarch at ~60fps: on 120Hz displays (ProMotion) rAF fires
        // every frame, which doubles GPU load for no visible gain here.
        let lastFrameTime = 0;
        const renderFrame = () => {
          const now = performance.now();
          if (now - lastFrameTime < 15) return;
          lastFrameTime = now;
          const delta = Math.min(clock.getDelta(), 0.033);
          applyCamera();
          simulation.update(delta, camera);
          post.render();
        };

        const start = () => renderer.setAnimationLoop(renderFrame);
        const stop = () => renderer.setAnimationLoop(null);
        start();

        if (control) {
          control.current = {
            setPaused: (p: boolean) => (p ? stop() : start()),
            setCamera: (progress: number, px: number, py: number) => {
              camProgress = progress;
              camPx = px;
              camPy = py;
            },
          };
        }

        // A ResizeObserver rather than a window listener: on mobile the URL bar
        // collapsing changes the container's height without a resize event.
        observer = new ResizeObserver(() => {
          const cw = container.clientWidth;
          const ch = container.clientHeight;
          if (!cw || !ch) return;
          camera.aspect = cw / ch;
          camera.updateProjectionMatrix();
          renderer.setSize(cw, ch);
          simulation.onResize(cw, ch);
        });
        observer.observe(container);

        onStatusRef.current?.(true);
      } catch (err) {
        console.warn("Black hole initialization failed:", err);
        onStatusRef.current?.(false);
      }
    }

    init();

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (control) control.current = null;
      if (renderer) {
        renderer.setAnimationLoop(null);
        renderer.dispose?.();
        const el = renderer.domElement;
        if (el && el.parentNode) el.parentNode.removeChild(el);
      }
    };
  }, [control]);

  // No error UI: when this can't run, the intro removes itself and the visitor
  // lands on the hero instead of on an apology.
  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
};

export default BlackHoleCanvas;
