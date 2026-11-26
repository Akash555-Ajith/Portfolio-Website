# Akash Ajith — Portfolio

A personalized version of the existing Singularity portfolio template. Its black-hole renderer, star field, gold/blue palette, typography, and scroll-driven effects are retained.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production check, run `npm run build`, then `npm start`.

## Content

All personal content is in `app/data.ts`. The page progresses through About, Projects, Experience, Skills, Currently Learning, and Contact. It uses the supplied README and contact details; no dates, project descriptions, or achievements have been invented.

- Currently learning DevOps: GitHub, Docker, AWS, Ansible.
- Contact: WhatsApp, Instagram, GitHub, LinkedIn, and the latest supplied email, **akasheajith2005@gmail.com**.
- No project details were supplied. Projects currently links to Akash's GitHub. Add entries to the typed `projects` array to populate the original animated project cards.

## Navigation

One wheel gesture or vertical swipe advances to the next section, and scrolling upward goes back. Momentum is ignored during a transition so a single gesture cannot skip multiple sections. The existing reveal sequence plays automatically to a readable stopping position.

The bottom navigation, arrow keys, Page Up/Down, Space/Shift+Space, Home, and End are also supported. Form controls retain their normal keyboard behavior. On short screens or at enlarged text sizes, overflowing chapter content remains independently scrollable so nothing is clipped. Reduced-motion preferences skip animated travel.

## Contact form

The Name, Email, Subject, and Message fields are **frontend-only**, as requested. Browser validation checks required fields and email format. Submitting displays an explicit unsent notice; it does not make a network request, store the message, or send email. Email integration is intentionally deferred until Akash requests it.

## Fonts and credits

Space Grotesk and JetBrains Mono are bundled locally in `app/fonts` with their SIL Open Font Licenses. This preserves the template's fonts and avoids a build-time Google Fonts request.

Original portfolio template: Samuel Perez Tovar. The original MIT license is retained in `LICENSE`. Original black-hole image/video credits: NASA's Goddard Space Flight Center / Jeremy Schnittman and B. Powell.
