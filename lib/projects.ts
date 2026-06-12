export type DeviceType = "phone" | "laptop";

export interface CaseStudySection {
  num: string;
  title: string;
  problem: string;
  why: string;
}

export interface CaseStudy {
  role: string;
  client: string;
  intro: string;
  sections: CaseStudySection[];
}

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
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    id: "01",
    name: "Sidetake",
    tagline: "A dark, quiet instrument for creative flow",
    description:
      "Sidetake hangs on one decision: stop logging tasks, start logging five stages of creative process — Referencing, Ideation, Execution, Editing, Drift. The Learn-from-the-Best layer turns those stages into something social — you can browse a real creator's actual day, see exactly how their twelve hours split, and book the time to talk to the person whose flow you want to copy. Three months in, testers had stopped asking for streaks and started describing themselves in Gem vocabulary — 'crashed to Calibrate this morning.' That private language was the point.",
    tech: ["SwiftUI", "Supabase", "React Native", "Swift"],
    status: "Live",
    year: "2026",
    device: "phone",
    gradient: ["#0d0a1a", "#1a0f2e"],
    videoSrc: "/sidetake.mp4",
    caseStudy: {
      role: "Founding designer",
      client: "Sidetake",
      intro:
        "Sidetake hangs on one decision: stop logging tasks, start logging five stages of creative process — Referencing, Ideation, Execution, Editing, Drift. The Learn-from-the-Best layer turns those stages into something social — you can browse a real creator's actual day, see exactly how their twelve hours split, and book the time to talk to the person whose flow you want to copy. Three months in, testers had stopped asking for streaks and started describing themselves in Gem vocabulary — 'crashed to Calibrate this morning.' That private language was the point.",
      sections: [
        {
          num: "01",
          title: "Home Screen",
          problem:
            "You log time, but have no sense of whether you're actually in flow. Raw duration doesn't tell you if you were present or just there.",
          why:
            "The home screen is a live signal, not a log. The Gem (here: Calibrate 54) shows current creative state in real time. Daily Insights surface two numbers that matter — your deepest window (10:40am) and your average time before distraction kicks in (14 min). Learn from the Best sits below so the path from self-awareness to someone else's workflow is one scroll, not a separate app.",
        },
        {
          num: "02",
          title: "Active Project Detail",
          problem:
            "Hours logged on a project don't tell you whether you were actually present. You can put in four hours and barely move the needle if most of it was comms and drift.",
          why:
            "Depth % replaces raw time as the headline metric — 91% means 91% of logged time was in a high-focus state, not bouncing between tabs or context-switching. The Quick Breakdown separates Creating, Research, Comms, and Drift so you can see exactly where the hours went, not just how many.",
        },
        {
          num: "03",
          title: "Learn from the Best",
          problem:
            "The most valuable creative knowledge lives in people's heads and can't be Googled. Mentorship access is gatekept by where you studied or who you know.",
          why:
            "Browse a real creator's actual day — see exactly how their sessions split between stages. Book a session directly, chat with them about what's working, and access the references and resources they've made available on the platform. The workflow data makes the conversation richer: you can say 'I'm spending 70% of my time in Drift' and have a mentor immediately understand the shape of the problem.",
        },
      ],
    },
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
