export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating?: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "stokes-2025",
    quote:
      "Priyanshu has delivered excellent results this year, contributing significantly to the success of the IT department and the wider business. His role in implementing the Neogrid data transfer, automating customer invoices, and driving multiple improvements to Purchasing workflows has had a measurable positive impact. These projects streamlined processes, reduced manual work, and enhanced efficiency across several departments. He has shown great initiative, consistently identifying opportunities to improve systems and taking ownership of complex tasks. His contributions have improved business operations in visible and lasting ways, demonstrating both technical skill and business awareness.",
    name: "IT Manager",
    role: "IT Manager",
    company: "Stokes Seeds Ltd.",
    rating: "4.94 / 5.00 — Highly Effective",
    featured: true,
  },
  {
    id: "stokes-2024",
    quote:
      "Exceeds Expectations across all competencies — demonstrating strong initiative, problem-solving ability, and job knowledge while contributing to IT department goals and delivering solutions that improved operational workflows.",
    name: "IT Manager",
    role: "IT Manager",
    company: "Stokes Seeds Ltd.",
    rating: "4.00 / 5.00 — Exceeds Expectations",
  },
  {
    id: "mto-2023",
    quote:
      "Priyanshu is strong technically, has good communication and collaboration skills as we were able to find work that would challenge him and relieve our staff. He is very organized, knows when to ask for help and provided regular updates on his progress and issues. He required very little orientation to take on work done by full time staff.",
    name: "Manager, Maintenance & Support",
    role: "Manager, Maintenance & Support",
    company: "Ontario Ministry of Transportation",
    rating: "Very Good — Often exceeds expectations",
  },
];
