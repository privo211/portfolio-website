export const SITE_CONFIG = {
  name: "Priyanshu Vora",
  title: "Priyanshu Vora | Software Engineer",
  description:
    "Priyanshu Vora — Software Engineer specializing in enterprise automation, backend systems, and full-stack development. Recent CS graduate from Brock University (GPA 3.7).",
  url: "https://privo211.github.io/priyanshu-portfolio",
  tagline:
    "Full-stack engineer specializing in enterprise automation and backend systems — I build tools that eliminate operational waste and ship measurable results.",
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
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Honors", href: "#honors" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const;

export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  experience: "experience",
  projects: "projects",
  education: "education",
  honors: "honors",
  testimonials: "testimonials",
  skills: "skills",
  resume: "resume",
  contact: "contact",
} as const;
