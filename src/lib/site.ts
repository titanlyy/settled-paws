export const siteConfig = {
  name: "Settled Paws",
  tagline: "Calm, practical dog training for real homes",
  description:
    "Problem-focused dog training guides for home owners and apartment dwellers. Positive reinforcement plans for puppies, barking, alone time, leash manners, and more—without the fluff.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://settledpaws.com",
  locale: "en_US",
  author: {
    name: "Alex Rivera",
    role: "Editorial writer, Settled Paws",
    bio: "Alex Rivera is the editorial persona behind Settled Paws—a home-based training writer who synthesizes positive-reinforcement best practices into clear, week-by-week plans for busy households. Not a certified veterinary behaviorist or licensed trainer; content is educational and never a substitute for professional veterinary or behavior help.",
  },
  categories: [
    {
      slug: "puppy-basics",
      name: "Puppy Basics",
      description:
        "First weeks at home, biting, potty habits, and settling into family life.",
    },
    {
      slug: "house-manners-barking",
      name: "House Manners & Barking",
      description:
        "Quiet living, settle skills, and manners that work in apartments and shared walls.",
    },
    {
      slug: "separation-alone-time",
      name: "Separation & Alone Time",
      description:
        "Graded alone-time protocols so your dog can relax when you leave.",
    },
    {
      slug: "leash-outdoor",
      name: "Leash & Outdoor",
      description:
        "Loose-leash walking, city reactivity management, and outdoor confidence.",
    },
    {
      slug: "tools-gear",
      name: "Tools & Gear",
      description:
        "Honest buying guides for crates, harnesses, and training aids—what actually helps.",
    },
  ] as const,
  nav: [
    { href: "/articles", label: "Articles" },
    { href: "/category/puppy-basics", label: "Puppy Basics" },
    { href: "/category/house-manners-barking", label: "Manners" },
    { href: "/category/separation-alone-time", label: "Alone Time" },
    { href: "/about", label: "About" },
  ],
  disclaimer:
    "Settled Paws provides educational dog-training information based on positive-reinforcement principles. This is not veterinary advice. If your dog shows aggression, severe anxiety, sudden behavior changes, or medical symptoms, consult a veterinarian and a qualified professional trainer or veterinary behaviorist.",
};

export type CategorySlug = (typeof siteConfig.categories)[number]["slug"];
