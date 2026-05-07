export interface SkillCategory {
  name: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  level: "expert" | "proficient" | "familiar";
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "JavaScript", level: "expert" },
      { name: "Java", level: "proficient" },
      { name: "SQL", level: "proficient" },
      { name: "C/C++", level: "familiar" },
      { name: "Bash", level: "familiar" },
      { name: "HTML/CSS", level: "proficient" },
    ],
  },
  {
    name: "Frameworks & Libraries",
    skills: [
      { name: "Flask", level: "expert" },
      { name: "React.js", level: "proficient" },
      { name: "Next.js", level: "proficient" },
      { name: "FastAPI", level: "proficient" },
      { name: "Django", level: "familiar" },
      { name: "tRPC", level: "proficient" },
      { name: "Prisma", level: "proficient" },
      { name: "Node.js", level: "familiar" },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "Microsoft Azure", level: "expert" },
      { name: "Azure AI Services", level: "expert" },
      { name: "CI/CD Pipelines", level: "proficient" },
      { name: "GitHub Actions", level: "familiar" },
      { name: "Docker", level: "familiar" },
      { name: "Linux", level: "proficient" },
      { name: "Git", level: "proficient" },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL", level: "proficient" },
      { name: "MySQL", level: "proficient" },
      { name: "MongoDB", level: "familiar" },
      { name: "Redis", level: "familiar" },
      { name: "Oracle", level: "familiar" },
    ],
  },
  {
    name: "Business & Enterprise",
    skills: [
      { name: "MS Dynamics 365 BC", level: "expert" },
      { name: "AL (Dynamics Extensions)", level: "expert" },
      { name: "Power Automate", level: "expert" },
      { name: "OCR / AI Pipelines", level: "expert" },
      { name: "ETL", level: "proficient" },
      { name: "Agile / Scrum", level: "proficient" },
    ],
  },
  {
    name: "Developer Tools",
    skills: [
      { name: "VS Code", level: "expert" },
      { name: "Git", level: "proficient" },
      { name: "IntelliJ", level: "familiar" },
      { name: "SharePoint", level: "proficient" },
      { name: "Figma", level: "familiar" },
    ],
  },
];

export const allSkills = skillCategories.flatMap((cat) =>
  cat.skills.map((s) => s.name)
);
