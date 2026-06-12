export type DeviceType = "phone" | "laptop";

export interface Project {
  id: string;
  name: string;
  company?: string;
  tagline: string;
  description: string;
  tech: string[];
  status: string;
  year: string;
  device: DeviceType;
  gradient: readonly [string, string];
  videoSrc?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    name: "Sidekick",
    tagline: "Your second brain in your pocket",
    description:
      "A mobile-first AI companion built to help you make fast decisions, draft sharp replies, and cut through the noise — without context-switching out of your life. Built for the always-on generation.",
    tech: ["React Native", "Claude API", "Supabase", "Expo"],
    status: "Live",
    year: "2024",
    device: "phone",
    gradient: ["#0f0c29", "#302b63"],
  },
  {
    id: "02",
    name: "Creator",
    tagline: "From brief to publish in one window",
    description:
      "An AI-powered content suite for solo creators and small teams. Handles ideation, drafting, image direction, and scheduling — without leaving the tab.",
    tech: ["Next.js", "OpenAI", "Figma API", "Node.js"],
    status: "Live",
    year: "2024",
    device: "laptop",
    gradient: ["#1a0533", "#3d1273"],
  },
  {
    id: "03",
    name: "Boomerang",
    tagline: "Send it. It comes back handled.",
    description:
      "An async comms tool that turns one-sided updates into tracked, resolved conversations. Drop a thought in, it follows up until there's closure — no chasing required.",
    tech: ["React", "Supabase", "Resend", "TypeScript"],
    status: "Beta",
    year: "2024",
    device: "laptop",
    gradient: ["#0d3b2e", "#0a1628"],
  },
  {
    id: "04",
    name: "Razorpay",
    company: "Tripadvisor",
    tagline: "Payments that don't interrupt the moment",
    description:
      "Redesigned checkout and payment UX for Tripadvisor's hotel and experience bookings. Focused on reducing drop-off at the payment step by making it feel invisible and trustworthy.",
    tech: ["Razorpay SDK", "React", "A/B Testing", "Figma"],
    status: "Case Study",
    year: "2023",
    device: "laptop",
    gradient: ["#0a1628", "#1e3a5f"],
  },
  {
    id: "05",
    name: "Even",
    company: "Healthcare",
    tagline: "Healthcare that doesn't make you feel sick",
    description:
      "A consumer health app that simplifies insurance, prescriptions, and care access. Designed to reduce anxiety around health decisions through clear, human-first UX.",
    tech: ["React Native", "HealthKit", "Node.js", "Firebase"],
    status: "Live",
    year: "2023",
    device: "phone",
    gradient: ["#0d2613", "#1a3a1a"],
  },
];
