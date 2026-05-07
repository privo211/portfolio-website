export interface Honor {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  tier: "platinum" | "gold" | "silver";
  image?: string;
}

export const honors: Honor[] = [
  {
    id: "deans-list",
    title: "Dean's Honour List",
    issuer: "Brock University",
    date: "2021 — 2025",
    description:
      "Awarded to students achieving a minimum 80% overall average across all courses. Recognized for sustained academic excellence throughout the Computer Science program.",
    tier: "gold",
    image: "/linkedin-images/Thumbnail_for_Deans_Honour_List_Award.jpg",
  },
  {
    id: "first-class",
    title: "First-Class Standing",
    issuer: "Brock University",
    date: "Dec 2025",
    description:
      "Graduated with First-Class Standing, recognizing outstanding academic achievement with a GPA of 3.7 across the 4-year Honours Computer Science program.",
    tier: "platinum",
  },
  {
    id: "gpa",
    title: "GPA 3.7 / 4.0",
    issuer: "Brock University",
    date: "2021 — 2025",
    description:
      "Maintained a high cumulative GPA throughout the Computer Science program while working part-time throughout most semesters.",
    tier: "gold",
  },
];
