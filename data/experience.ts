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
      "Shipped 30+ MS D365 Business Central extensions across inventory, sales, and purchasing — reduced manual error rates by 94% through scalable API interfaces and workflow automation.",
      "Built an OCR invoice processing pipeline (Python + Azure AI Document Intelligence) that handles 200+ invoices daily, cutting processing from 2 days to under 4 hours.",
      "Designed a dynamic lot number generation algorithm ensuring 100% traceability across 10K+ SKUs, improving inventory accuracy by 37%.",
      "Automated daily dispatch of 200+ sales invoices via Power Automate and Business Central APIs, eliminating 17 hours of manual overhead weekly.",
    ],
    technologies: [
      "Python",
      "Azure AI",
      "MS Dynamics 365",
      "AL",
      "Power Automate",
      "Flask",
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
      "Built a seed germination analysis database (MS Access + VBA + SQL) that saved 60 hours/quarter with 98% error reduction in quality-control reporting.",
      "Developed a self-service Flask app for email signature generation, deployed on Debian Linux and serving 200+ employees with multi-language support.",
      "Identified and resolved technical workflow inefficiencies, delivering solutions that improved team productivity by 15%.",
    ],
    technologies: [
      "Flask",
      "Python",
      "SQL",
      "VBA",
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
      "Automated CI/CD pipeline deployments for Ontario 511's Track My Plow platform using Python and Azure DevOps, improving release reliability for a system serving millions of drivers.",
      "Led AODA accessibility remediation across 10+ government web applications, ensuring provincial compliance through systematic testing and implementation.",
      "Bridged communication between business stakeholders and developers, accelerating project delivery by 15 hours per week.",
    ],
    technologies: ["Python", "Azure DevOps", "CI/CD", "AODA", "Git"],
  },
];
