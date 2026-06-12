export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: "Live" | "Beta" | "In Progress" | "Coming Soon";
  year: string;
  accent: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    name: "VoicePort",
    tagline: "Real-time emotion detection from voice",
    description:
      "An AI model that analyzes vocal patterns to detect and visualize emotional states in real-time. Built using deep learning on audio waveforms, it maps tone, pace, and pitch variation to an emotional spectrum. Used in interview prep and mental wellness tooling.",
    tech: ["Python", "TensorFlow", "WebRTC", "React"],
    status: "Live",
    year: "2024",
    accent: "#5b47d4",
  },
  {
    id: "02",
    name: "StoryBoard AI",
    tagline: "Turn prompts into illustrated story panels",
    description:
      "Feed a story prompt and receive a full illustrated comic panel layout. Combines LLM narrative generation with image diffusion models to create storyboard-quality visuals from text alone. Built for screenwriters, game designers, and visual storytellers.",
    tech: ["Stable Diffusion", "GPT-4", "Next.js", "Python"],
    status: "Beta",
    year: "2024",
    accent: "#d44570",
  },
  {
    id: "03",
    name: "CaptionCraft",
    tagline: "Smart captions that sound like you",
    description:
      "An AI caption generator that fine-tunes to your writing style from a sample of your previous posts. Generates platform-aware captions for Instagram, LinkedIn, and X that feel authentically yours — not like they came from a template.",
    tech: ["Fine-tuned LLM", "Next.js", "Supabase", "OpenAI"],
    status: "Live",
    year: "2024",
    accent: "#c8a548",
  },
  {
    id: "04",
    name: "Mood Canvas",
    tagline: "AI mood boards from a single sentence",
    description:
      "Describe a feeling, brand, or abstract idea in one sentence. Mood Canvas assembles a curated visual board — matching color palettes, textures, typography references, and image compositions — in seconds. No design experience required.",
    tech: ["DALL-E 3", "Pinecone", "Next.js", "Python"],
    status: "In Progress",
    year: "2024",
    accent: "#45a8d4",
  },
  {
    id: "05",
    name: "Character Lab",
    tagline: "Design your alter ego with AI",
    description:
      "Generate stylized character illustrations in the Jexlin art style. Customize skin tone, outfit era, accessories, and personality archetype. The first 1000 characters generated will become part of a public gallery — a permanent exhibit in the Jexlin world.",
    tech: ["LoRA", "ComfyUI", "FastAPI", "React"],
    status: "Coming Soon",
    year: "2025",
    accent: "#6bd4a8",
  },
];

export interface CharacterArt {
  image: string;
  exhibitNo: string;
  title: string;
  caption: string;
}

export const characterArts: CharacterArt[] = [
  {
    image: "/characters/jex-selfie.png",
    exhibitNo: "I",
    title: "The Protagonist",
    caption: "Blue-skinned. Gold chain. Perpetually amused.",
  },
  {
    image: "/characters/kurta-saree.png",
    exhibitNo: "II",
    title: "Opening Night",
    caption: "Dressed for a world that hasn't met them yet.",
  },
  {
    image: "/characters/mirror-selfie.png",
    exhibitNo: "III",
    title: "Home Base",
    caption: "The skateboard says JEXLIN. The flat says the rest.",
  },
  {
    image: "/characters/baseball.png",
    exhibitNo: "IV",
    title: "Back Court",
    caption: "Urban. Unbothered. Slightly chaotic.",
  },
  {
    image: "/characters/track.png",
    exhibitNo: "V",
    title: "Training Arc",
    caption: "One of them is taking this seriously.",
  },
  {
    image: "/characters/field.png",
    exhibitNo: "VI",
    title: "Good Afternoon",
    caption: "Somewhere between a plan and a vibe.",
  },
  {
    image: "/characters/winter.png",
    exhibitNo: "VII",
    title: "Winter Mode",
    caption: "Animal hats. Windowsill. Not the worst day.",
  },
];
