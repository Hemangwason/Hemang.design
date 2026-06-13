export type DeviceType = "phone" | "laptop";
export type ProjectStatus = "live" | "development";
export type ProjectPlatform = "App" | "Website" | "Chrome Extension";

export interface GroundScreen {
  src: string;
  title: string;
  problem: string;
  rationale: string;
}

export interface GroundProcess {
  src: string;
  poster?: string;
  width: number;
  height: number;
  bg?: string;
  label?: string;
  blurb?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  blurb: string;
  writeup: string;
  tags: string[];
  role: string;
  client: string;
  year: string;
  device: DeviceType;
  gradient: readonly [string, string];
  thumbnailVideo: string;
  thumbnailBg: string;
  mastheadVideo: string;
  mastheadBg: string;
  modalBg: string;
  status: ProjectStatus;
  platform: ProjectPlatform;
  liveUrl?: string;
  screens?: GroundScreen[];
  process?: GroundProcess;
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "sidetake",
    name: "Sidetake",
    emoji: "💎",
    tagline: "A dark, quiet instrument for creative flow",
    blurb:
      "A focus instrument built around five creative states — Referencing, Ideation, Execution, Editing, Drift — that remembers the shape of your day and shows it back without judgment.",
    writeup:
      "Sidetake hangs on one decision: stop logging tasks, start logging five stages of creative process — Referencing, Ideation, Execution, Editing, Drift. The Learn-from-the-Best layer turns those stages into something social — you can browse a real creator's actual day, see exactly how their twelve hours split, and book the time to talk to the person whose flow you want to copy. Three months in, testers had stopped asking for streaks and started describing themselves in Gem vocabulary — 'crashed to Calibrate this morning.' That private language was the point.",
    tags: ["Focus", "iOS", "Consumer"],
    role: "Founding designer",
    client: "Sidetake",
    year: "2026",
    device: "laptop",
    gradient: ["#02040A", "#0d0a1a"],
    thumbnailVideo: "/projects/thumbs/sidetake.mp4",
    thumbnailBg: "#f2f2f5",
    mastheadVideo: "/projects/sidetake.mp4",
    mastheadBg: "#02040A",
    modalBg: "rgba(2,4,14,0.94)",
    status: "development",
    platform: "App",
    screens: [
      {
        src: "/projects/sidetake-screens/home.png",
        title: "Project Flow Map",
        problem:
          "Creatives don't know what state they're in or when their best hours actually land. Most focus apps show streaks or timers — neither tells you anything about the shape of your energy.",
        rationale:
          "The home screen is a live signal, not a log. The Gem (here: Calibrate 54) shows current creative state in real time. Daily Insights surface two numbers that matter — your deepest window (10:40am) and your average time before distraction kicks in (14 min). Learn from the Best sits below so the path from self-awareness to someone else's workflow is one scroll, not a separate app.",
      },
      {
        src: "/projects/sidetake-screens/project.png",
        title: "Active Project Detail",
        problem:
          "Hours logged on a project don't tell you whether you were actually present. You can put in four hours and barely move the needle if most of it was comms and drift.",
        rationale:
          "Depth % replaces raw time as the headline metric — 91% means 91% of logged time was in a high-focus state, not bouncing between tabs or context-switching. The Quick Breakdown separates Creating, Research, Comms, and Drift so you can see exactly where the hours went, not just how many. Start New Session is a persistent CTA because the point is always to get back in, not to admire the numbers.",
      },
      {
        src: "/projects/sidetake-screens/creator.png",
        title: "Creator Workflow",
        problem:
          "Following a creator on social gives you their output, not their process. You have no idea how they actually split their time, what phase they front-load, or what their working language even is.",
        rationale:
          "Ananya's profile is built from her real session data, not a bio she wrote. The donut shows her 12-hour budget broken into the five Sidetake stages (Reference, Ideate, Make, Review, Drift) on a real brand project. Her tagline — \"Reference hard. Decide fast. Make before the energy drops.\" — is derived from her workflow signature, not a self-description. Stage Breakdown adds one line of plain text per phase so the numbers have intent, not just weight.",
      },
      {
        src: "/projects/sidetake-screens/book-date.png",
        title: "Book a 1-on-1 — Date",
        problem:
          "Booking a session with a mentor is usually a cold ask: pick any date, hope they're free, figure out the agenda later. The friction is high enough that most people never follow through.",
        rationale:
          "Availability is resolved upfront — only real open dates are highlighted so there's no back-and-forth. Session Focus is chosen before you confirm a date, so the meeting has an agenda before it's booked. Naming the focus options (Portfolio & Project Review, Workflow & Process Deep-Dive) signals what kind of conversation is being purchased, not just a timeslot.",
      },
      {
        src: "/projects/sidetake-screens/book-time.png",
        title: "Book a 1-on-1 — Time",
        problem:
          "Most booking flows hand off to a third-party scheduler mid-flow, which breaks the context and makes it feel like an admin task rather than a continuation of the product.",
        rationale:
          "Time selection stays inside the same visual language — same card, same green accent, same tone. The CTA reads 'Confirm Booking' with the exact date and time already resolved (March 8 · 2:00 PM) so there's no ambiguity about what you're committing to before you tap.",
      },
      {
        src: "/projects/sidetake-screens/confirm.png",
        title: "Session Requested",
        problem:
          "After booking, most apps show a generic 'you're all set' screen that tells you nothing about what comes next. The moment the action is complete, the product goes quiet.",
        rationale:
          "The confirmation screen acts as a receipt and a handoff note. It surfaces all four booking details (mentor, date, time, format) so nothing needs to be cross-checked in email. The subline — 'We'll notify you once Ananya confirms the booking.' — sets the expectation that this is a request, not a guaranteed slot, so there's no confusion if timing shifts. Done ends the flow cleanly rather than routing back into the feed.",
      },
    ],
    process: {
      src: "/projects/sidetake-process.webp",
      poster: "/projects/sidetake-process-poster.webp",
      width: 8000,
      height: 10183,
      bg: "#101010",
      label: "The flow",
      blurb:
        "How Sidetake came together — from the first scattered screens to the Gem-driven home, project, and creator views. Scroll to pan, ⌘/Ctrl + scroll to zoom.",
    },
  },
  {
    id: "02",
    slug: "sidetalk",
    name: "SideTalk",
    emoji: "💬",
    tagline: "Designing a more natural way to learn",
    blurb:
      "A chat-first learning platform where creative students ask real questions, share work-in-progress, and get guidance from mentors and peers inside structured communities.",
    writeup:
      "SideTalk is a chat-first learning platform for creative students — ask real questions, share work-in-progress, and get guidance from mentors and peers inside structured communities. The design move was to collapse the distance between curiosity and action: no formal mentorship rituals, no waiting weeks for replies, just ask in the channel where the people slightly ahead of you already hang out. The product feels closer to a group chat than a course platform on purpose — guidance that doesn't feel gated, delayed, or intimidating, and a place to learn in public instead of consuming content alone.",
    tags: ["Learning", "Community", "Mentorship"],
    role: "Founding designer",
    client: "Sidetake",
    year: "2026",
    device: "laptop",
    gradient: ["#b8c8e8", "#E4E9F5"],
    thumbnailVideo: "/projects/thumbs/sidetalk.mp4",
    thumbnailBg: "#f8f9fc",
    mastheadVideo: "/projects/sidetalk.mp4",
    mastheadBg: "#E4E9F5",
    modalBg: "rgba(10,16,36,0.94)",
    status: "live",
    platform: "Website",
  },
  {
    id: "03",
    slug: "boomerang",
    name: "Boomerang",
    emoji: "🪃",
    tagline: "Alumni rehiring as a live, ranked pipeline",
    blurb:
      "AI scores every former employee 0–100, surfaces a 'why now' signal, and drafts the re-engagement message — designed and shipped in under five hours at ContextCon.",
    writeup:
      "Boomerang is an AI-powered alumni rehiring platform built in under five hours for ContextCon. Instead of tracking former employees on LinkedIn one-by-one, it scores each on their likelihood to return (0–100), surfaces a 'why now' signal, and drafts the re-engagement message — turning a static alumni list into a live, ranked pipeline. HR software defaults to rows, filters, and status pills; I wanted Boomerang to feel like the system was thinking. Glass on a purple-to-blue wallpaper with drifting orbs, score rings around avatars so the score is the person, JetBrains Mono numbers as proof they were computed. Blank canvas to shipped demo in one afternoon — exactly the thesis ContextCon set out to prove.",
    tags: ["AI", "B2B", "Hiring", "Hackathon"],
    role: "Solo designer · front-end",
    client: "Boomerang",
    year: "2026",
    device: "laptop",
    gradient: ["#9391c8", "#D8D6F2"],
    thumbnailVideo: "/projects/thumbs/boomerang.mp4",
    thumbnailBg: "#f5f4fb",
    mastheadVideo: "/projects/boomerang.mp4",
    mastheadBg: "#D8D6F2",
    modalBg: "rgba(16,12,36,0.94)",
    status: "live",
    platform: "Website",
  },
  {
    id: "04",
    slug: "jexlin",
    name: "Jexlin",
    emoji: "👕",
    tagline: "Streetwear as a medium for point of view",
    blurb:
      "A streetwear and accessories label where every touchpoint — product, visuals, tone, storefront — extends the same world. Built as a design-led identity system, not a product catalogue.",
    writeup:
      "Jexlin is a fashion and accessories label built around self-expression — streetwear energy, bold visual language, experimental pieces. The ambition was to treat fashion as a medium for point of view, not transactional merch: a label where every piece reads like a sentence in a bigger story. As a designer, that meant treating brand and product as one artifact from day one — pieces that read like chapters, campaigns that feel narrative rather than catalogue, a storefront where the tone is as considered as the typography. The result isn't another fashion label fighting for attention in a feed — it's a point of view you can put on.",
    tags: ["Brand", "Streetwear", "D2C"],
    role: "Founding designer",
    client: "Jexlin",
    year: "2026",
    device: "laptop",
    gradient: ["#1A1917", "#2a2925"],
    thumbnailVideo: "/projects/thumbs/jexlin.mp4",
    thumbnailBg: "#f5f4f2",
    mastheadVideo: "/projects/jexlin.mp4",
    mastheadBg: "#1A1917",
    modalBg: "rgba(22,20,16,0.96)",
    status: "live",
    platform: "Website",
    liveUrl: "https://jexlindesigns.com/",
  },
  {
    id: "05",
    slug: "crater",
    name: "Crater",
    emoji: "🛡️",
    tagline: "A defense layer for the AI era",
    blurb:
      "A live risk-intelligence layer that detects AI tool usage across browsers, apps, and extensions — and warns users in the moment of risk instead of after the breach.",
    writeup:
      "Crater is a defense layer for the AI era. People paste sensitive data into chatbots, install extensions with full-page permissions, and connect plugins that quietly train on their work — without understanding retention, sharing, or scope. Traditional security tools don't see AI-specific risk. Crater sits across the surfaces where AI gets used — sites, apps, extensions, plugins, enterprise integrations — detects tool usage in real time, and warns the user in the moment of risk rather than after a breach. Hard blocks get routed around; a trust layer that informs in-context changes behavior more durably than a firewall that says no. AI safety is a horizontal problem, not a vertical product — exactly the wedge incumbents can't easily occupy.",
    tags: ["AI", "Security", "B2B"],
    role: "Founding designer",
    client: "Crater",
    year: "2026",
    device: "laptop",
    gradient: ["#0B0B0B", "#1a1a2e"],
    thumbnailVideo: "/projects/thumbs/crater.mp4",
    thumbnailBg: "#f2f2f4",
    mastheadVideo: "/projects/crater.mp4",
    mastheadBg: "#0B0B0B",
    modalBg: "rgba(6,6,10,0.96)",
    status: "live",
    platform: "Chrome Extension",
    liveUrl: "https://chromewebstore.google.com/detail/jcieelfbdidgfhbaonhhjlljfkmmhnah",
  },
  {
    id: "06",
    slug: "sid-voice-host",
    name: "Sid Voice Host",
    emoji: "🎙️",
    tagline: "A voice that opens the room before the host walks on",
    blurb:
      "Art direction and interface for an AI co-emcee — a voice that sets the room's mood before the human host walks on. Two screens, one atmosphere.",
    writeup:
      "Sid is voice-first: the real output is a presence in a room, not a page on a screen. That inverted the brief — I wasn't designing a dashboard but the mood a piece of software sets for the thing about to happen. The screen had to feel like the opening credits, not the film. One sentence above every decision: warm, not clinical. Hosted, not automated. Two states carry the whole product — a frosted setup card on a drifting ambient gradient, then a near-invisible live readout of what the camera sees and what the agent is saying. The hardest thing to design is a screen that knows when to shut up; the part I'm proudest of isn't the card, it's the empty field around it.",
    tags: ["Art direction", "UI", "Motion"],
    role: "Brand, art direction, and UI",
    client: "—",
    year: "2026",
    device: "laptop",
    gradient: ["#c5cde8", "#E3E7F6"],
    thumbnailVideo: "/projects/thumbs/sid-voice-host.mp4",
    thumbnailBg: "#f4f5fb",
    mastheadVideo: "/projects/sid-voice-host.mp4",
    mastheadBg: "#E3E7F6",
    modalBg: "rgba(8,12,30,0.94)",
    status: "development",
    platform: "Chrome Extension",
  },
];
