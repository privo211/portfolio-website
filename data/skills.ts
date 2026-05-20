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
      { name: "JavaScript", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "Python", level: "expert" },
      { name: "Java", level: "proficient" },
      { name: "SQL", level: "proficient" },
      { name: "C", level: "familiar" },
      { name: "AL", level: "expert" },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "HTML", level: "proficient" },
      { name: "CSS", level: "proficient" },
      { name: "Responsive UI Design", level: "proficient" },
      { name: "State Management", level: "proficient" },
      { name: "Component Architecture", level: "proficient" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Flask", level: "expert" },
      { name: "FastAPI", level: "proficient" },
      { name: "Node.js", level: "proficient" },
      { name: "REST APIs", level: "expert" },
      { name: "Prisma", level: "proficient" },
      { name: "PostgreSQL", level: "proficient" },
      { name: "Async Processing", level: "proficient" },
    ],
  },
  {
    name: "Engineering Practices",
    skills: [
      { name: "Git", level: "proficient" },
      { name: "CI/CD Pipelines", level: "proficient" },
      { name: "Agile Development", level: "proficient" },
      { name: "Workflow Automation", level: "expert" },
      { name: "QA & Troubleshooting", level: "proficient" },
    ],
  },
  {
    name: "Cloud & Tools",
    skills: [
      { name: "Azure", level: "proficient" },
      { name: "Azure DevOps", level: "proficient" },
      { name: "Debian/Ubuntu Linux", level: "proficient" },
      { name: "Figma", level: "familiar" },
      { name: "Power BI", level: "familiar" },
      { name: "SharePoint", level: "proficient" },
      { name: "VS Code", level: "proficient" },
      { name: "IntelliJ", level: "familiar" },
    ],
  },
];

export const allSkills = skillCategories.flatMap((cat) =>
  cat.skills.map((s) => s.name)
);
