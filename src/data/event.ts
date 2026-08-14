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

// Flip this to true once a real Ticket Tailor event is live and
// TICKET_TAILOR_CHECKOUT_BASE_URL points at it. Until then, every "Buy
// Tickets" CTA falls back to the founding-list signup instead of a real
// checkout link.
export const ticketsOnSale = false;

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
    "Three days. One progression. This isn't a schedule label — it's the actual stages of building a major exterior-service company, in order.",
  steps: [
    {
      day: "Friday",
      word: "Build",
      coreIdea: "Create Demand.",
      description: "Master customer acquisition and create the foundation.",
    },
    {
      day: "Saturday",
      word: "Scale",
      coreIdea: "Build the Machine.",
      description:
        "Build the people, systems, and financial infrastructure to grow.",
    },
    {
      day: "Sunday",
      word: "Dominate",
      coreIdea: "Expand the Machine.",
      description:
        "Master strategy, brand, expansion, and the path to your next major milestone.",
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
    coreIdea: "Create Demand.",
    coreQuestion: "How do I consistently get customers?",
    tracks: ["Door-to-Door", "Organic", "Affiliate Marketing", "Meta", "Google"],
    description:
      "Day one is about customer acquisition — marketing, brand positioning, offers, door-to-door sales, lead generation, and the sales engine that takes you from $0 to $20K+ months.",
    sessions: [
      "The $0–$20K/Month Sales Engine",
      "Brand Positioning & Irresistible Offers",
      "Meta & Google Ads for Home Service",
      "Sales Psychology & Closing",
    ],
    outcome: "I know how to create demand.",
    note: "BUILD isn't a beginner track — even $2M+ operators come back to sharpen their customer-acquisition engine.",
  },
  {
    day: "Saturday",
    title: "Scale",
    coreIdea: "Build the Machine.",
    coreQuestion: "How do I handle more customers without breaking the business?",
    tracks: ["Hiring", "Operations", "Systems", "Automation", "Finance"],
    description:
      "Day two is about everything required to handle significantly more revenue without you becoming the bottleneck — hiring, training, SOPs, CRM, cash flow, and getting the owner out of production.",
    sessions: [
      "Hiring & Training Your First Real Team",
      "Getting the Owner Out of Production",
      "CRM, SOPs & Quality Control",
      "Cash Flow, Margins & KPIs",
    ],
    outcome: "I know how to turn this into a real company.",
  },
  {
    day: "Sunday",
    title: "Dominate",
    coreIdea: "Expand the Machine.",
    coreQuestion: "How do I become a major company?",
    tracks: ["Strategy", "Brand", "Expansion", "Leadership", "90-Day Plan"],
    description:
      "Day three is strategic and aspirational — geographic expansion, brand, strategic partnerships and acquisitions, capital allocation, and what the owner's role looks like at every stage of growth.",
    sessions: [
      "Geographic & Multi-Market Expansion",
      "Strategic Partnerships & Acquisitions",
      "Building an Asset, Not Another Job",
      "The Revenue Roadmap: $250K → $10M+",
    ],
    outcome: "I can see exactly where I'm going next.",
  },
] as const;

// The signature Sunday feature: what actually changes at each revenue
// milestone. Educational framework, not a guarantee — keep the disclaimer
// intact wherever this is rendered.
export const roadmap = {
  eyebrow: "The Roadmap",
  headline: "What actually changes at each level.",
  intro:
    "Sunday's centerpiece: a milestone-by-milestone look at what changes as an exterior-service company grows — so you know exactly what you're building toward next.",
  disclaimer:
    "An educational framework, not a rulebook — every business's path looks a little different.",
  milestones: [
    {
      revenue: "$250K",
      category: "Foundation",
      change: "Establish the foundation.",
    },
    {
      revenue: "$500K",
      category: "Systems",
      change: "Build management and repeatable systems.",
    },
    {
      revenue: "$1M",
      category: "Owner Role",
      change: "Stop being the center of every operation.",
    },
    {
      revenue: "$2.5M",
      category: "Leadership",
      change: "Build real leadership and departmental infrastructure.",
    },
    {
      revenue: "$5M",
      category: "Expansion",
      change: "Think strategically about markets, brand, and expansion.",
    },
    {
      revenue: "$10M+",
      category: "Enterprise",
      change:
        "Executive leadership, capital allocation, acquisitions, and long-term enterprise strategy.",
    },
  ],
} as const;

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
