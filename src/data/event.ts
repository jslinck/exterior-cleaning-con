// Central event configuration. Update dates, copy, and pricing here —
// components read from this file so nothing about the event is hard-coded.

export const event = {
  name: "EXTERIOR CON",
  shortName: "EXTERIOR CON",
  year: 2027,
  city: "Phoenix",
  region: "Scottsdale, Arizona",
  location: "Phoenix / Scottsdale, Arizona",
  dateRange: "February 26–28, 2027",
  dateShort: "Feb 26–28, 2027",
  dayLabels: ["Friday", "Saturday", "Sunday"],
  startISO: "2027-02-26",
  endISO: "2027-02-28",
  headline: "Build a bigger business. Build a better life.",
  subheadline:
    "The premium summit for exterior-cleaning entrepreneurs who are done playing small — three days of main-stage strategy, tactical workshops, and the industry's next generation of operators, in the desert.",
  targetAttendance: 400,
};

// The central brand philosophy and the literal structure of the three days.
// Reused across the hero, the identity section, and the education/schedule
// section — keep this in sync with `schedule` below.
export const brand = {
  tagline: "BUILD · SCALE · DOMINATE",
  pillars: [
    { day: "Friday", word: "Build" },
    { day: "Saturday", word: "Scale" },
    { day: "Sunday", word: "Dominate" },
  ],
};

export const ctas = {
  primary: "Join the Founding List",
  secondary: "See the Experience",
  finalCta: "Be First In Line",
};

export const stats = [
  { value: "3", label: "Days", suffix: "" },
  { value: "400", label: "Entrepreneurs", suffix: "+" },
  { value: "5", label: "Creator & Operator Speakers", suffix: "+" },
  { value: "1", label: "Live Concert", suffix: "" },
  { value: "12", label: "Tactical Workshops", suffix: "+" },
] as const;

export const identity = {
  eyebrow: "The Philosophy",
  headline: "Build. Scale. Dominate.",
  intro:
    "This isn't a tagline — it's the actual structure of the weekend. Three days, three phases, one intentional progression from the foundation of your business to the market leader you're building it to become.",
  steps: [
    {
      day: "Friday",
      word: "Build",
      description:
        "Get customers — door-to-door, organic content, affiliate marketing, Meta ads, and Google ads.",
    },
    {
      day: "Saturday",
      word: "Scale",
      description:
        "Turn a functioning business into a scalable company — operations, systems, hiring, and automation.",
    },
    {
      day: "Sunday",
      word: "Dominate",
      description:
        "Become the market leader — leadership, brand, strategy, expansion, wealth, and a 90-day plan to make it real.",
    },
  ],
};

export const whyThisExists = {
  eyebrow: "Why This Exists",
  headline: "The exterior-cleaning industry outgrew its conferences.",
  body: [
    "Most trade conferences were built for a different generation, in a different decade — folding chairs, fluorescent lights, and panels about topics nobody's business actually runs on anymore.",
    "The operators building real businesses right now — window cleaning, pressure washing, solar cleaning, and everything exterior — are younger, faster, and building in public. They're learning Meta ads, personal branding, and recurring revenue, not just how to bid a job.",
    "EXTERIOR CON is built from scratch for that operator: more modern, more tactical, more creator-driven, more experiential, more social, and more ambitious than the conference you grew up going to.",
  ],
};

export const experiences = [
  {
    title: "Main Stage",
    description: "Keynotes from top creators and operators, produced like a real show — not a webinar with a podium.",
  },
  {
    title: "Tactical Workshops",
    description: "Small-room sessions on sales, Meta ads, hiring, ops, and recurring revenue you can implement Monday.",
  },
  {
    title: "Sponsor Expo",
    description: "Hands-on activations from the companies actually building tools for exterior-service businesses.",
  },
  {
    title: "VIP Lounge",
    description: "A dedicated space to reset, take meetings, and network away from the noise of the main floor.",
  },
  {
    title: "Creator Access",
    description: "Scheduled VIP time with speakers and creators — not just a rope line and a wave from the stage.",
  },
  {
    title: "Networking",
    description: "Structured and unstructured time built into every day to actually meet the room, not just sit in it.",
  },
  {
    title: "Saturday Night Concert",
    description: "The summit ends with a live concert. Business by day, festival energy by night.",
  },
  {
    title: "Live Business Teardowns",
    description: "Real companies, real numbers, torn down live on stage by operators who've been there.",
  },
  {
    title: "Awards",
    description: "Recognizing the operators actually building — growth, brand, and the businesses raising the bar.",
  },
  {
    title: "90-Day Business Planning",
    description: "Leave Sunday with a working 90-day plan, not just a notebook full of ideas.",
  },
] as const;

export const schedule = [
  {
    day: "Friday",
    title: "Build",
    tracks: ["Door-to-Door", "Organic", "Affiliate Marketing", "Meta", "Google"],
    description:
      "Day one is about marketing — door-to-door, organic content, affiliate partnerships, Meta ads, and Google ads: the channels that actually put customers in front of your business.",
  },
  {
    day: "Saturday",
    title: "Scale",
    tracks: ["Hiring", "Operations", "Systems", "Automation", "Finance"],
    description:
      "Day two is about turning a functioning business into a scalable company — operations, systems, hiring, automation, management, and the financial moves that scale revenue and teams together.",
  },
  {
    day: "Sunday",
    title: "Dominate",
    tracks: ["Strategy", "Brand", "Expansion", "Leadership", "90-Day Plan"],
    description:
      "Day three is about becoming a market leader — leadership, brand, competitive strategy, expansion, wealth, and long-term vision, closing with a working 90-day plan to make it real.",
  },
] as const;

export const vip = {
  eyebrow: "VIP Access",
  headline: "First four rows. Every advantage.",
  description:
    "VIP is for operators who want to sit closer, move faster, and get real time with the people on stage — not just watch the summit happen.",
  perks: [
    "First 4 rows reserved at main stage",
    "VIP lounge access, all 3 days",
    "VIP-only networking opportunities",
    "Enhanced speaker & creator access",
    "Priority entry & check-in",
    "Premium VIP welcome package",
  ],
};

export const elite = {
  eyebrow: "Elite Access",
  headline: "Only 20 available. By design.",
  description:
    "Elite isn't a bigger badge — it's a genuinely different weekend. A small, concierge-run experience for operators who want direct time with the people on stage, not just a seat in the room.",
  availability: "Only 20 Elite tickets available for EXTERIOR CON 2027.",
  perks: [
    "Private dinner with featured speakers, creators & industry leaders",
    "Exclusive speaker & creator meet & greet",
    "Backstage access to Saturday night's concert",
    "Artist meet & greet",
    "Elite-only networking",
    "Exclusive Elite gift package",
    "Concierge-style experience throughout the weekend",
  ],
};

export const saturdayNight = {
  eyebrow: "Saturday Night",
  headline: "The summit ends with a live concert.",
  body: "Three days of building your business. One night the summit turns into a full entertainment experience — live concert, DJ, creator appearances, and networking, with the same high-energy nightlife atmosphere as a festival. Details on the lineup are coming — for now, save the date and clear your Saturday night.",
};

export const sponsors = {
  eyebrow: "Sponsor & Expo",
  headline: "The companies building exterior service, on the floor.",
  body: "Leading companies serving window cleaning, pressure washing, solar, and exterior-service businesses will run hands-on activations and booths throughout the summit. Sponsor lineup will be announced as partners are confirmed.",
  categories: [
    "CRM",
    "Insurance",
    "Equipment",
    "Marketing",
    "Financing",
    "Payments",
    "Business Software",
  ],
};

export const foundingList = {
  eyebrow: "Founding List",
  headline: "Be first in line.",
  body: "We're validating demand before we commit serious capital to this event — and building the founding list of operators who want in first. Founding-list members get first access to tickets at founding pricing, and the first look at every speaker announcement before it goes public.",
  perks: [
    "First access when founding tickets go live",
    "Founding-member pricing, locked in early",
    "First look at every speaker & lineup announcement",
    "A direct line to shape what this event becomes",
  ],
};

export const lineupSection = {
  eyebrow: "Founding Creator Lineup",
  headline: "The people we're building this around.",
  body: "We're assembling the biggest creators and operators in exterior cleaning to headline EXTERIOR CON. Nobody below is confirmed yet — this is the target lineup we're actively building toward, and we'll announce names publicly the moment they're locked.",
  disclaimer: "We're in active conversations with creators and operators across the industry, but nobody is signed yet — so we're not naming names until they're locked. Slots below will be filled in as speakers are confirmed.",
};
