import type { ResumeData } from "./types";


export const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "linkedin.com/in/alexrivera",
    title: "Senior Software Engineer",
    summary: "Dedicated software engineer with 6+ years of experience in building scalable web applications. Expert in React, TypeScript, and Node.js. Proven track record of delivering high-quality code and leading development teams."
  },
  experience: [
    {
      id: "1",
      company: "TechFlow Solutions",
      position: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "2021-01",
      endDate: "Present",
      description: "- Led the development of a real-time analytics dashboard used by 500+ enterprise clients.\n- Optimized backend queries resulting in a 40% reduction in API latency.\n- Mentored junior developers and implemented CI/CD pipelines.",
      current: true
    },
    {
      id: "2",
      company: "Innovate Labs",
      position: "Full Stack Developer",
      location: "Austin, TX",
      startDate: "2018-06",
      endDate: "2020-12",
      description: "- Developed and maintained multiple React-based web applications.\n- Collaborated with UX designers to improve accessibility across the platform.\n- Reduced cloud infrastructure costs by 20% through efficient resource management.",
      current: false
    }
  ],
  education: [
    {
      id: "1",
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2014-09",
      endDate: "2018-05",
      location: "Berkeley, CA"
    }
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "GraphQL"],
  projects: [
    {
      id: "1",
      name: "Open Source CRM",
      description: "A lightweight CRM system built with Next.js and Prisma.",
      link: "github.com/alexr/crm"
    }
  ],
  customSections: []
};

export const THEMES: Record<string, string> = {
  blue: "#2563eb",
  emerald: "#10b981",
  rose: "#f43f5e",
  amber: "#f59e0b",
  indigo: "#4f46e5",
  slate: "#334155",
  purple: "#9333ea"
};

export const FONTS = [
  { name: "Inter", value: "var(--font-sans)" },
  { name: "Serif", value: "ui-serif, Georgia, serif" },
  { name: "Mono", value: "ui-monospace, SFMono-Regular, monospace" },
  { name: "Outfit", value: "'Outfit', sans-serif" },
  { name: "Space Grotesk", value: "'Space Grotesk', sans-serif" }
];
