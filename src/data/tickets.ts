// Ticket tiers. Three tiers by design: General, VIP, Elite. Elite is
// intentionally scarce — keep `capacity` in sync with whatever the real
// cap ends up being.

export type Ticket = {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  // When set, the ticket is marked down from `price` to `foundingPrice`
  // for the first `foundingCap` tickets sold, then reverts to `price`.
  foundingPrice?: number;
  foundingPriceLabel?: string;
  foundingCap?: number;
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
    price: 697,
    priceLabel: "$697",
    foundingPrice: 497,
    foundingPriceLabel: "$497",
    foundingCap: 100,
    tagline: "The core 3-day conference experience.",
    ctaLabel: "Get General Admission",
    includes: [
      "Full 3-day conference access",
      "Main stage",
      "Workshops",
      "Expo / sponsor area",
      "Networking",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    price: 1197,
    priceLabel: "$1,197",
    foundingPrice: 997,
    foundingPriceLabel: "$997",
    foundingCap: 100,
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
      "Artist meet & greet",
      "Elite-only networking",
      "Exclusive Elite gift package",
      "Concierge-style experience throughout",
    ],
  },
];
