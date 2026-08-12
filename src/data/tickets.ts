// Ticket tiers. Three tiers by design: General, VIP, Elite. Elite is
// intentionally scarce — keep `capacity` in sync with whatever the real
// cap ends up being.

export type Ticket = {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  ctaLabel: string;
  badge?: string;
  highlight?: "recommended" | "elite";
  capacity?: string;
  includes: string[];
};

export const tickets: Ticket[] = [
  {
    id: "ga",
    name: "General",
    price: 497,
    priceLabel: "$497",
    tagline: "The core 3-day conference experience.",
    ctaLabel: "Get General Admission",
    includes: [
      "Full 3-day conference access",
      "Main stage",
      "Workshops",
      "Expo / sponsor area",
      "Networking",
      "Saturday night concert",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    price: 997,
    priceLabel: "$997",
    tagline: "Everything in General, plus front-row access.",
    ctaLabel: "Get VIP",
    badge: "Most Popular",
    highlight: "recommended",
    includes: [
      "Everything in General Admission",
      "First 4 rows reserved at main stage",
      "VIP lounge access",
      "VIP-only networking opportunities",
      "Enhanced speaker & creator access",
      "Priority entry / check-in",
      "Premium VIP welcome package",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 2997,
    priceLabel: "$2,997",
    tagline: "The concierge EXTERIOR CON experience.",
    ctaLabel: "Request Elite Access",
    badge: "Only 20 Available",
    highlight: "elite",
    capacity: "20",
    includes: [
      "Everything in VIP",
      "Private dinner with featured speakers, creators & industry leaders",
      "Exclusive speaker & creator meet & greet",
      "Backstage access to Saturday night's concert",
      "Artist meet & greet",
      "Elite-only networking",
      "Exclusive Elite gift package",
      "Concierge-style experience throughout",
    ],
  },
];
