/** Personal information supplied by Akash. Unknown details stay empty. */
export const EMAIL = "akasheajith2005@gmail.com";
export const GITHUB_URL = "https://github.com/Akash555-Ajith";
export const WHATSAPP_NUMBER: string = "917012708002";
export const INSTAGRAM_HANDLE: string = "akashde15";
export const chapters = [
  { id: "ch1", long: "01 About", short: "About" },
  { id: "ch2", long: "02 Projects", short: "Projects" },
  { id: "ch3", long: "03 Experience", short: "Experience" },
  { id: "skills", long: "04 Skills", short: "Skills" },
  { id: "learning", long: "05 Learning", short: "Learning" },
  { id: "ch4", long: "06 Contact", short: "Contact" },
];
export const phaseNames = ["Event horizon", "Accretion disk", "Time dilation", "Skills", "Currently learning", "Singularity"];
export const copy = {
  introDesktop: "I'm a third-year B.Tech Computer Science student at Cochin University of Science and Technology (CUSAT), with Junior Web Development internships at Tatos and Ariussoft.",
  introMobile: "I'm a third-year B.Tech Computer Science student at Cochin University of Science and Technology (CUSAT), with Junior Web Development internships at Tatos and Ariussoft.",
  timelineNote: "Junior Web Development internships I've completed.",
};
export interface Project {
  id: number; title: string; tag: string; img: string; des: string; stack: string[]; link: string;
}
// Add only Akash's supplied projects here.
export const projects: Project[] = [
  {
    id: 1,
    title: "CataCloud",
    tag: "B2B commerce & catalogues",
    img: "/projects/catacloud.svg",
    des: "A B2B commerce platform for creating storefronts and custom product catalogues. Manage inventory, build proposals, and handle orders through a central dashboard, with presets for different industries.",
    stack: ["Next.js", "TypeScript", "Supabase"],
    link: "https://github.com/Akash555-Ajith/catacloud",
  },
  {
    id: 2,
    title: "Shopping Cart",
    tag: "E-commerce application",
    img: "/projects/shopping-cart.webp",
    des: "A PHP and MySQL shopping application with product search, cart quantity updates, user accounts, and order tracking. An admin area manages products, categories, brands, orders, and payment records.",
    stack: ["PHP", "MySQL", "Bootstrap"],
    link: "https://github.com/Akash555-Ajith/Shopping-Cart",
  },
];
export const timeline = [
  { when: "Completed internship", title: "Junior Web Development — Tatos", body: "Completed a Junior Web Development internship at Tatos. The company builds custom websites and mobile applications, alongside digital strategy, design, and automation services.", link: "https://tatos.tech/", logo: "/companies/tatos.png", company: "Tatos", logoStyle: "dark" },
  { when: "Completed internship", title: "Junior Web Development — Ariussoft", body: "Completed a Junior Web Development internship at Ariussoft. Based in Kochi, the company offers website and web application development, e-commerce, mobile apps, hosting, and digital marketing.", link: "https://ariussoft.com/", logo: "/companies/ariussoft.png", company: "Ariussoft", logoStyle: "light" },
];
export const skillGroups = [
  { title: "Frontend development", tools: ["React", "HTML", "CSS", "Bootstrap"] },
  { title: "Backend development", tools: ["Node.js", "PHP"] },
  { title: "Backend services", tools: ["Supabase"] },
  { title: "Development tools", tools: ["GitHub · Version control", "Vercel · Hosting", "Cloudflare · Image storage"] },
  { title: "Programming languages", tools: ["C", "C++", "Python"] },
];
export const learningSkills = ["GitHub", "Docker", "AWS", "Ansible"];
export const socialMedia = [
  { name: "GitHub", label: "Akash555-Ajith", link: GITHUB_URL },
  { name: "LinkedIn", label: "Akash Ajith", link: "https://www.linkedin.com/in/akash-ajith-064573349" },
  { name: "Email", label: EMAIL, link: `mailto:${EMAIL}` },
  ...(WHATSAPP_NUMBER ? [{ name: "WhatsApp", label: `+${WHATSAPP_NUMBER}`, link: `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}` }] : []),
  ...(INSTAGRAM_HANDLE ? [{ name: "Instagram", label: `@${INSTAGRAM_HANDLE}`, link: `https://www.instagram.com/${INSTAGRAM_HANDLE}/` }] : []),
];
