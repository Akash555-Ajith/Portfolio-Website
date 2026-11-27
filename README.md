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
- Featured projects: [CataCloud](https://github.com/Akash555-Ajith/catacloud) and [Shopping Cart](https://github.com/Akash555-Ajith/Shopping-Cart). Descriptions are based on their public source and README; project artwork comes from those repositories.
- Company descriptions and logos come from the official [Tatos](https://tatos.tech/) and [Ariussoft](https://ariussoft.com/) websites. They describe the companies, not additional internship responsibilities.

## Navigation

One wheel gesture or vertical swipe advances to the next section, and scrolling upward goes back. Momentum is ignored during a transition so a single gesture cannot skip multiple sections. The existing reveal sequence plays automatically to a readable stopping position.

The bottom navigation, arrow keys, Page Up/Down, Space/Shift+Space, Home, and End are also supported. Form controls retain their normal keyboard behavior. On short screens or at enlarged text sizes, overflowing chapter content remains independently scrollable so nothing is clipped. Reduced-motion preferences skip animated travel.

## Contact form

Name, Email, Subject, and Message are submitted through [FormSubmit](https://formsubmit.co/) to **akasheajith2005@gmail.com** without leaving the portfolio. The visitor's address becomes the Reply-To address. There are no email passwords or API secrets in the project.

**Activation required:** submit the form once from the website, then open the confirmation email in Akash's inbox (check spam too) and activate the form. Submit another message after activation to verify delivery. Repeat activation if FormSubmit requests it for a different site URL. Code and mocked response checks cannot verify inbox delivery.

Required fields and email format are validated before sending. A hidden honeypot deters simple bots. Duplicate submissions are blocked while a request is pending, and a 20-second timeout restores the form on a stalled request. Failed submissions preserve the fields and show a direct email link. The success message reports acceptance by FormSubmit, not guaranteed inbox delivery. Messages pass through FormSubmit; review its service limits and spam handling before relying on it at higher traffic volumes.

## Fonts and credits

Space Grotesk and JetBrains Mono are bundled locally in `app/fonts` with their SIL Open Font Licenses. This preserves the template's fonts and avoids a build-time Google Fonts request.

Original portfolio template: Samuel Perez Tovar. The original MIT license is retained in `LICENSE`. Original black-hole image/video credits: NASA's Goddard Space Flight Center / Jeremy Schnittman and B. Powell.
