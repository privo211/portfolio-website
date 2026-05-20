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
      "Production-grade OCR pipeline that automates vendor invoice intake, extracting item-level data from diverse PDF formats and pushing directly into Microsoft Dynamics 365 Business Central — replacing 4 hours/day of manual data entry.",
    highlights: [
      "Engineered a resilient data pipeline supporting both searchable PDFs and scanned documents using PyMuPDF and Azure AI Document Intelligence with configurable fallback logic",
      "Designed vendor-specific regex parsing logic and fuzzy-matching algorithms to reconcile invoice items against ERP quality reports with minimal human intervention",
      "Built a Flask web interface with Azure AD (MSAL) authentication, letting non-technical staff upload, review, and submit extracted data via REST APIs",
      "Cut invoice processing time by 90% — from 2 days to under 4 hours — now handling 200+ invoices daily across 6 major suppliers",
    ],
    technologies: [
      "Python",
      "Flask",
      "Azure AI Document Intelligence",
      "MS Dynamics 365",
      "REST APIs",
      "PostgreSQL",
      "PyMuPDF",
      "MSAL",
    ],
    image: "/projects/invoice-ocr.png",
    github: "https://github.com/privo211/invoice-ocr",
    featured: true,
    gridSpan: "large",
  },
  {
    id: "resumex",
    title: "ResumeX",
    subtitle: "ATS-Optimized Resume Builder",
    description:
      "Co-developed an AI-driven web app that helps users build tailored, ATS-friendly resumes with guided inputs, smart suggestions, and one-click export — built with the T3 Stack and integrated Stripe for premium tier payments.",
    highlights: [
      "Architected end-to-end features using Next.js, tRPC, and Prisma for type-safe, high-performance data handling across concurrent users",
      "Integrated Google Gemini API with asynchronous streaming for real-time AI content suggestions and CAR statement generation",
      "Implemented Stripe-based billing and secure document generation pipelines (PDF/DOCX) with concurrent user authentication",
      "Delivered a modular, production-ready product across 4 agile sprints with a cross-functional team",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "tRPC",
      "Stripe",
      "Google Gemini",
    ],
    image: "/projects/resumex.png",
    github: "https://github.com/RohittPillai/COSC-4P02-PROJECT",
    featured: true,
    gridSpan: "tall",
  },
];

export const otherProjects: Project[] = [];
