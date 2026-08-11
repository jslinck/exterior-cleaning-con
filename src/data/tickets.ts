// Ticket tiers. Intentionally simple: exactly two tiers. Do not add a third
// without updating the pricing/VIP copy in event.ts as well.

export type Ticket = {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  featured: boolean;
  includes: string[];
};

export const tickets: Ticket[] = [
  {
    id: "ga",
    name: "GA",
    price: 497,
    priceLabel: "$497",
    tagline: "Everything you need for three days.",
    featured: false,
    includes: [
      "Full 3-day summit access",
      "Main stage keynotes",
      "All tactical workshops",
      "Sponsor & expo floor",
      "Networking",
      "Saturday night concert",
      "All summit events",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    price: 997,
    priceLabel: "$997",
    tagline: "Everything in GA, plus front-row access.",
    featured: true,
    includes: [
      "Everything in GA",
      "First 4 rows reserved at main stage",
      "VIP lounge access, all 3 days",
      "Separate VIP check-in",
      "Early entry to general sessions",
      "Scheduled access to speakers & creators",
      "VIP networking & reception opportunities",
    ],
  },
];
