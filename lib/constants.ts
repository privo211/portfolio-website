export const SITE_CONFIG = {
  name: "Priyanshu Vora",
  title: "Priyanshu Vora | Software Engineer",
  description:
    "Priyanshu Vora — Software Engineer specializing in enterprise automation, backend systems, and full-stack development. Recent CS graduate from Brock University (GPA 3.7).",
  url: "https://priyanshu-vora.vercel.app",
  tagline:
    "I build automation that saves enterprises thousands of hours — OCR pipelines, ERP integrations, and backend systems that ship measurable results.",
  role: "Software Engineer",
  location: "Toronto, ON, Canada",
  email: "priyanshu.vora211@gmail.com",
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/privo211",
  linkedin: "https://www.linkedin.com/in/priyanshuvora/",
} as const;

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  skills: "skills",
  experience: "experience",
  projects: "projects",
  education: "education",
  testimonials: "testimonials",
  contact: "contact",
} as const;
