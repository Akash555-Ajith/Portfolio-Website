"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Unproject the tilted disc, rotate its material, then project it back into
// the same fixed camera view. The core and disc orientation never wobble.
const fragmentShader = `
  precision highp float;
  uniform sampler2D galaxy;
  uniform float time;
  uniform float aspect;
  varying vec2 vUv;
  mat2 turn(float a) { float c=cos(a), s=sin(a); return mat2(c,s,-s,c); }
  float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
  void main() {
    const float imageAspect = 1.777;
    // Cover on wide screens; retain more of the tilted disc on portrait screens.
    float viewHeight = aspect < 1.0 ? 1.32 : max(1.0, aspect/imageAspect);
    vec2 p = (vUv - .5) * vec2(aspect,1.0) * viewHeight;
    vec2 disc = turn(-.43) * p;
    disc.y /= .46;
    float radius = length(disc);
    vec2 rotating = turn(-time * .065) * disc;
    rotating.y *= .46;
    vec2 samplePoint = turn(.43) * rotating;
    // The texture's bright nucleus sits just above its geometric midpoint.
    vec2 uv = samplePoint / vec2(imageAspect,1.0) + vec2(.508,.54);
    vec3 arms = texture2D(galaxy, clamp(uv, .001, .999)).rgb;
    float edge = 1.0 - smoothstep(.78,1.04,radius);
    float bounds = step(0.0,uv.x)*step(uv.x,1.0)*step(0.0,uv.y)*step(uv.y,1.0);
    // Distant stars are independent of the rotating galaxy and remain fixed.
    vec2 grid = p * 175.0;
    vec2 cell = floor(grid);
    float seed = hash(cell);
    vec2 offset = vec2(hash(cell+12.7),hash(cell+37.3));
    float star = (1.0-smoothstep(.015,.11,length(fract(grid)-offset))) * step(.982,seed);
    vec3 space = vec3(.003,.005,.013) + vec3(.62,.72,1.0)*star*.65;
    gl_FragColor = vec4(space + arms * edge * bounds, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/** A live galaxy renderer, paused outside the portfolio and in hidden tabs. */
export default function GalaxyBackground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    const root = layer?.closest(".sg-root");
    if (!layer || !canvas || !root) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false, powerPreference: "low-power" });
    } catch { return; } // Keep the poster if graphics acceleration is unavailable.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const uniforms = { galaxy: { value: null as THREE.Texture | null }, time: { value: 0 }, aspect: { value: 1 } };
    const material = new THREE.ShaderMaterial({
      uniforms, fragmentShader,
      vertexShader: "varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}",
      depthTest: false, depthWrite: false,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(geometry, material));
    const camera = new THREE.Camera();
    let loaded = false;
    let disposed = false;
    let frame = 0;
    let previous = 0;
    const draw = (now: number) => {
      uniforms.time.value += previous ? Math.min((now - previous) / 1000, .05) : 0;
      previous = now;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(draw);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      const active = root.getAttribute("data-inside") === "true";
      if (loaded && active && !motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
      else if (loaded) renderer.render(scene, camera);
    };
    const resize = () => {
      renderer.setSize(layer.clientWidth, layer.clientHeight, false);
      uniforms.aspect.value = layer.clientWidth / Math.max(1, layer.clientHeight);
      if (loaded) renderer.render(scene, camera);
    };
    const texture = new THREE.TextureLoader().load("/videos/milky-way-poster.webp", (image) => {
      if (disposed) { image.dispose(); return; }
      image.colorSpace = THREE.SRGBColorSpace;
      image.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      uniforms.galaxy.value = image;
      loaded = true;
      resize();
      canvas.style.opacity = "1";
      update();
    });
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(layer);
    resize();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-inside"] });
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      observer.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      texture.dispose();
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="sg-galaxy" ref={layerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="sg-galaxy-canvas" />
      <div className="sg-galaxy-shade" />
    </div>
  );
}
