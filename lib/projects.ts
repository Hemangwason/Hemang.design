export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: string;
  year: string;
  imageSrc: string;
  videoSrc?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    name: "VoicePort",
    tagline: "Real-time emotion detection from voice",
    description:
      "An AI model that analyzes vocal patterns to detect and visualize emotional states in real-time. Built using deep learning on audio waveforms — maps tone, pace, and pitch to an emotional spectrum. Used in interview prep and mental wellness tools.",
    tech: ["Python", "TensorFlow", "WebRTC", "React"],
    status: "Live",
    year: "2024",
    imageSrc: "/characters/jex-selfie.png",
  },
  {
    id: "02",
    name: "StoryBoard AI",
    tagline: "Turn prompts into illustrated story panels",
    description:
      "Feed a story prompt and receive a full illustrated comic panel layout. Combines LLM narrative generation with image diffusion models to create storyboard-quality visuals from text alone. For screenwriters and visual storytellers.",
    tech: ["Stable Diffusion", "GPT-4", "Next.js", "Python"],
    status: "Beta",
    year: "2024",
    imageSrc: "/characters/kurta-saree.png",
  },
  {
    id: "03",
    name: "CaptionCraft",
    tagline: "Smart captions that sound like you",
    description:
      "Fine-tuned AI caption generator that learns your writing style from a sample of your previous posts. Generates platform-aware captions for Instagram, LinkedIn, and X that feel authentically yours — not like they came from a template.",
    tech: ["Fine-tuned LLM", "Next.js", "Supabase", "OpenAI"],
    status: "Live",
    year: "2024",
    imageSrc: "/characters/mirror-selfie.png",
  },
  {
    id: "04",
    name: "Mood Canvas",
    tagline: "AI mood boards from a single sentence",
    description:
      "Describe a feeling, brand, or idea in one sentence. Mood Canvas assembles a curated visual board — palettes, textures, typography references, and image compositions — in seconds. No design experience required.",
    tech: ["DALL-E 3", "Pinecone", "Next.js", "Python"],
    status: "In Progress",
    year: "2024",
    imageSrc: "/characters/field.png",
  },
  {
    id: "05",
    name: "Character Lab",
    tagline: "Design your alter ego with AI",
    description:
      "Generate stylized character illustrations in the Jexlin art style. Customize skin tone, outfit era, accessories, and personality archetype. The first 1000 characters generated become part of a public gallery.",
    tech: ["LoRA", "ComfyUI", "FastAPI", "React"],
    status: "Coming Soon",
    year: "2025",
    imageSrc: "/characters/baseball.png",
  },
];
