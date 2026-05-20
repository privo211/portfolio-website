export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  technologies: string[];
  github?: string;
  live?: string;
  image?: string;
  featured: boolean;
  gridSpan?: "large" | "tall" | "default";
}

export const featuredProjects: Project[] = [
  {
    id: "invoice-ocr",
    title: "Vendor Invoice Processor",
    subtitle: "Intelligent Invoice Processing Pipeline",
    description:
      "Production-grade invoice processing platform integrating OCR, regex parsing, REST APIs, and automated reconciliation workflows for high-volume ERP invoice intake.",
    highlights: [
      "Developed a production-grade invoice processing platform integrating OCR, regex parsing, REST APIs, and automated reconciliation workflows for high-volume ERP invoice intake.",
      "Engineered a resilient data pipeline supporting both searchable PDFs and scanned documents using PyMuPDF and Azure AI Document Intelligence with configurable fallback logic.",
      "Built a Flask-based administrative dashboard for exception handling and manual review workflows, improving operational throughput and usability for non-technical users.",
      "Cut invoice processing time by 87% — now handling 200+ invoices daily across 6 major suppliers.",
    ],
    technologies: [
      "Python",
      "Flask",
      "Azure AI",
      "MS Dynamics 365",
      "REST APIs",
      "PostgreSQL",
      "PyMuPDF",
    ],
    image: "/projects/invoice-ocr.png",
    github: "https://github.com/privo211/invoice-ocr",
    featured: true,
    gridSpan: "large",
  },
  {
    id: "resumex",
    title: "ResumeX",
    subtitle: "AI-Powered Resume Enhancement Platform",
    description:
      "Architected and developed a full-stack AI-powered resume enhancement platform featuring responsive React interfaces, real-time AI content generation, and scalable frontend state management.",
    highlights: [
      "Built secure backend APIs using FastAPI and PostgreSQL, integrating document generation pipelines and scalable communication with LLM services.",
      "Designed polished user workflows and responsive UI patterns with a strong focus on usability, maintainability, and clean user experience.",
      "Delivered a modular, production-ready product across 4 agile sprints with a cross-functional team.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "tRPC",
      "Prisma",
      "FastAPI",
      "PostgreSQL",
    ],
    image: "/projects/resumex.png",
    github: "https://github.com/RohittPillai/COSC-4P02-PROJECT",
    featured: true,
    gridSpan: "tall",
  },
  {
    id: "flick",
    title: "Flick",
    subtitle: "Video Editing Tool Interface",
    description:
      "Led end-to-end UX research and interface design for a video editing platform prototype, conducting competitor analysis, surveys, stakeholder interviews, and persona-driven workflow analysis.",
    highlights: [
      "Led end-to-end UX research and interface design for a video editing platform prototype, conducting competitor analysis, surveys, stakeholder interviews, and persona-driven workflow analysis to optimize user experience.",
      "Designed responsive interface flows and AI-assisted editing concepts in Figma while iteratively refining layouts and interaction patterns through user feedback and collaborative design reviews.",
    ],
    technologies: ["UI/UX Research", "Figma", "Prototyping", "User Testing"],
    live: "https://www.figma.com/proto/f2UjdB5V3lfIWE5TfonHYx/Flick---Video-Editing-Interface---Final-Edit?node-id=1-14&t=rkh3rRdHbKWwoqus-1",
    featured: true,
    gridSpan: "default",
  },
];

export const otherProjects: Project[] = [];
