# Milky Way background

The supplied 630 × 354 recording was inspected as a visual reference. Its tilted spiral, warm nucleus and blue-violet arms inspired a new original texture, generated with the built-in image-generation tool. The recording itself is not shipped.

Asset: `public/videos/milky-way-poster.webp` (1672 × 941, generated source converted to WebP).

`GalaxyBackground.tsx` renders the texture through a live WebGL shader: it unprojects the inclined disc, continuously rotates its material, then reprojects it through a fixed camera. Procedural distant stars remain stationary. There is no oscillating image transform or video loop. Reduced motion freezes the renderer; unsupported WebGL retains the poster. Rendering pauses outside the interior sections and in hidden tabs.

## Generation prompt

Use case: stylized-concept. Asset type: high-resolution full-screen portfolio background, landscape 16:9, ideally 3840x2160. Create a detailed cinematic visualization of the Milky Way viewed from outside: a magnificent tilted spiral galaxy, long axis running from lower left to upper right, warm ivory/gold luminous nucleus at center, fine pink-lavender dust lanes and many crisp blue-violet spiral arms, pinprick individual stars, deep near-black space surrounding it. Galaxy occupies 85 percent of width, elliptical projected disc roughly half as tall as wide. Rich intricate wispy structure and dark gaps between arms, not a smooth blurry nebula. Realistic astrophotography-like CGI, subtle natural glow, crisp stars, no lens blur or defocus. No text, logo, watermark, UI, border, planets, foreground objects. This is a new clean original composition inspired by a low-resolution rotating spiral-galaxy reference.
