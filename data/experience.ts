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
    period: "Sep 2024 - Present",
    type: "work",
    description: [
      "Designed and shipped 30+ Business Central workflow and interface enhancements, developing scalable UI components, validations, and automation tools that reduced manual error rates by 94%.",
      "Engineered an AI-powered OCR invoice processing platform using Python, Azure AI, and REST APIs with automated reconciliation and exception handling, reducing processing time by 87% and saving 250+ hours annually.",
      "Built automated operational workflows using Power Automate and Business Central APIs to process and dispatch 200+ daily invoices with integrated monitoring, retry handling, and failure alerting.",
      "Collaborated closely with operations and purchasing teams to gather requirements, troubleshoot production issues, and deliver maintainable technical solutions improving workflow efficiency and usability.",
    ],
    technologies: [
      "Python",
      "Azure AI",
      "MS Dynamics 365",
      "AL",
      "Power Automate",
      "Flask",
      "REST APIs",
      "CI/CD",
    ],
  },
  {
    id: "stokes-it-analyst",
    role: "IT Systems Analyst & Developer",
    company: "Stokes Seeds Ltd.",
    location: "Thorold, ON",
    period: "May 2024 - Aug 2024",
    type: "work",
    description: [
      "Developed and deployed a full-stack Flask web application on Debian Linux, enabling 200 employees to generate multilingual email signatures through a responsive self-service interface.",
      "Built reporting dashboards, SQL workflows, and Power Automate integrations to streamline operational reporting and improve internal data accessibility.",
      "Designed and optimized database-backed workflows for seed germination quality-control analysis, reducing reporting overhead by 60 hours per quarter and improving data reliability.",
    ],
    technologies: ["Flask", "Python", "SQL", "Debian Linux", "Power Automate", "VBA"],
  },
  {
    id: "ontario-mto",
    role: "Junior Technical Analyst (Co-op)",
    company: "Ontario Ministry of Transportation",
    location: "St. Catharines, ON",
    period: "Sep 2023 - Dec 2023",
    type: "work",
    description: [
      "Integrated Python automation scripts into Azure DevOps CI/CD pipelines for Ontario 511 Track My Plow, improving deployment reliability and streamlining annual production updates.",
      "Conducted accessibility testing and remediation support across 10+ government web applications to ensure compliance with AODA standards and improve user accessibility.",
      "Collaborated with business and technical stakeholders to diagnose workflow bottlenecks, troubleshoot production issues, and improve cross-team efficiency by 15 hours per week.",
    ],
    technologies: ["Python", "Azure DevOps", "CI/CD", "AODA", "Git"],
  },
];
