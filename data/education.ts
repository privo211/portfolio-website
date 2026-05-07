export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  gpa: string;
  honors: string[];
  coursework: string[];
}

export const education: Education = {
  degree: "Bachelor of Science (Honours), Computer Science",
  school: "Brock University",
  location: "St. Catharines, ON",
  period: "May 2021 — Dec 2025",
  gpa: "3.7 / 4.0",
  honors: [
    "First-Class Standing",
    "Dean's Honour List Awardee",
  ],
  coursework: [
    "Software Engineering",
    "Data Structures",
    "Advanced Algorithms",
    "Computer Architecture",
    "Database Systems",
    "Artificial Intelligence",
    "Machine Learning",
    "Operating Systems",
    "Cyber-Security",
    "Web Development",
  ],
};
