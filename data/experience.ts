export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "work" | "education";
  description: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "stokes-bsd",
    role: "Business Solutions Developer",
    company: "Stokes Seeds Ltd.",
    location: "Thorold, ON",
    period: "Sep 2024 — Present",
    type: "work",
    description: [
      "Architected 30+ custom MS D365 Business Central (AL) extensions, designing scalable API interfaces across inventory, sales, and purchasing workflows, reducing manual error rates by 94%.",
      "Orchestrated an AI-powered OCR invoice processing pipeline using Python, PyMuPDF, and Azure AI Document Intelligence, cutting processing time by 90% and saving 250+ hours of manual work.",
      "Designed a dynamic lot number generation algorithm based on product metadata, ensuring 100% traceability and improving inventory data accuracy by 37%.",
      "Streamlined daily delivery of 200+ sales invoices through Power Automate and Business Central API triggers, eliminating 17 hours of manual overhead weekly.",
    ],
    technologies: [
      "Python",
      "Flask",
      "MS Dynamics 365",
      "Azure AI",
      "AL",
      "Power Automate",
      "Git",
      "CI/CD",
    ],
  },
  {
    id: "stokes-it-analyst",
    role: "IT Systems Analyst & Developer",
    company: "Stokes Seeds Ltd.",
    location: "Thorold, ON",
    period: "May 2024 — Aug 2024",
    type: "work",
    description: [
      "Engineered a specialized Analysis Database for seed germination testing using MS Access, VBA, and SQL, saving the lab technician 60 hours/quarter with 98% error reduction.",
      "Developed a self-service Flask web application for personalized email signature generation, deployed on a Debian Linux VM and serving 200+ employees.",
      "Optimized operational workflows by mapping technical inefficiencies, delivering solutions that drove a 15% increase in team productivity.",
    ],
    technologies: [
      "Flask",
      "Python",
      "MS Access",
      "VBA",
      "SQL",
      "Debian Linux",
      "Power Automate",
    ],
  },
  {
    id: "ontario-mto",
    role: "Junior Technical Analyst (Co-op)",
    company: "Ontario Ministry of Transportation",
    location: "St. Catharines, ON",
    period: "Sep 2023 — Dec 2023",
    type: "work",
    description: [
      "Refined the Track My Plow platform by scripting Python automation within Azure DevOps CI/CD pipelines, improving deployment reliability for Ontario 511 — a system serving millions of drivers.",
      "Led comprehensive AODA accessibility remediation across 10+ web applications, ensuring full provincial compliance and implementing remediation strategies.",
      "Unified cross-functional communication between business stakeholders and developers, accelerating project delivery by 15 hours per week.",
    ],
    technologies: ["Python", "Azure DevOps", "CI/CD Pipelines", "AODA", "Git"],
  },
  {
    id: "parshwa-infotech",
    role: "Java Developer Intern",
    company: "Parshwa Infotech | IT Services & Software Consulting",
    location: "Ahmedabad, India",
    period: "Sep 2020 — Mar 2021",
    type: "work",
    description: [
      "Built a Café Management System using Core Java and Swing (GUI) with MySQL and JDBC (backend), applying OOP principles and data-flow design under TCS iON supervision.",
      "Proposed and implemented UI improvements that improved accessibility and usability for a broader user base.",
    ],
    technologies: ["Java", "Swing", "MySQL", "JDBC", "OOP"],
  },
];
