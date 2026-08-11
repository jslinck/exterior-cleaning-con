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

export const whyThisExists = {
  eyebrow: "Why This Exists",
  headline: "The exterior-cleaning industry outgrew its conferences.",
  body: [
    "Most trade conferences were built for a different generation, in a different decade — folding chairs, fluorescent lights, and panels about topics nobody's business actually runs on anymore.",
    "The operators building real businesses right now — window cleaning, pressure washing, solar cleaning, and everything exterior — are younger, faster, and building in public. They're learning Meta ads, personal branding, and recurring revenue, not just how to bid a job.",
    "EXTERIOR CON is built from scratch for that operator. Premium production, tactical content, and an environment that feels like the business you're trying to build — not the one you're trying to leave behind.",
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
] as const;

export const schedule = [
  {
    day: "Friday",
    title: "Get Customers",
    tracks: ["Sales", "Marketing", "Personal Brand"],
    description:
      "Day one is about demand. Door-to-door sales, Meta and paid advertising, and building a personal brand that generates inbound leads on its own.",
  },
  {
    day: "Saturday",
    title: "Build the Machine",
    tracks: ["Hiring", "Operations", "Finance", "Leadership"],
    description:
      "Day two is about the business behind the business — hiring and managing teams, tightening operations, understanding your numbers, and leading like an owner, not a technician.",
  },
  {
    day: "Sunday",
    title: "Scale",
    tracks: ["Recurring Revenue", "Expansion", "Leadership", "90-Day Plan"],
    description:
      "Day three is about what's next — building recurring revenue, expanding into new markets and services, and leaving with a working 90-day plan for your business.",
  },
] as const;

export const vip = {
  eyebrow: "VIP Access",
  headline: "First four rows. Every advantage.",
  description:
    "VIP is for operators who want to sit closer, move faster, and get real time with the people on stage — not just watch the summit happen.",
  perks: [
    "First 4 rows reserved at main stage",
    "Access to the VIP lounge all three days",
    "Separate VIP check-in — skip the main line",
    "Early entry to general sessions",
    "Scheduled access to speakers & creators",
    "VIP-only networking & reception opportunities",
  ],
};

export const saturdayNight = {
  eyebrow: "Saturday Night",
  headline: "The summit ends with a live concert.",
  body: "Three days of building your business. One night to celebrate it. Details on the lineup are coming — for now, save the date and clear your Saturday night.",
};

export const sponsors = {
  eyebrow: "Sponsor & Expo",
  headline: "The companies building exterior service, on the floor.",
  body: "Leading companies serving window cleaning, pressure washing, solar, and exterior-service businesses will run hands-on activations and booths throughout the summit — software, equipment, financing, and more. Sponsor lineup will be announced as partners are confirmed.",
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
  disclaimer: "None of the creators or operators below are confirmed to appear. Names shown reflect who we are in conversation with.",
};
