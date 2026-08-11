// Founding Creator Lineup — data-driven so names, bios, images, and
// confirmation status can be updated without touching any component.
//
// IMPORTANT: `confirmed` must stay `false` for every entry until that person
// has actually signed a speaker agreement. The UI intentionally renders no
// "confirmed" language anywhere for confirmed: false entries — do not add
// any copy elsewhere that implies otherwise.

export type Speaker = {
  id: string;
  name: string;
  handle: string;
  focus: string;
  bio: string;
  imageUrl?: string;
  confirmed: boolean;
};

export const speakers: Speaker[] = [
  {
    id: "austin-h2o",
    name: "Austin H2O",
    handle: "@austinh2obros",
    focus: "Window Cleaning",
    bio: "Built a following documenting the day-to-day of running a window cleaning crew — sales, systems, and the content that gets both.",
    confirmed: false,
  },
  {
    id: "caleb-cleans",
    name: "Caleb Cleans",
    handle: "@calebcleans",
    focus: "Exterior Cleaning",
    bio: "Exterior-cleaning operator and creator known for tactical, no-fluff breakdowns of running and marketing a service business.",
    confirmed: false,
  },
  {
    id: "bailey-sells",
    name: "Bailey Sells",
    handle: "@baileyysells",
    focus: "D2D Sales",
    bio: "Door-to-door sales specialist teaching exterior-service reps how to sell more, faster, without sounding like a script.",
    confirmed: false,
  },
  {
    id: "nick-gaines",
    name: "Nick Gaines",
    handle: "@nickgaines1",
    focus: "Operations & Growth",
    bio: "Operator focused on the systems, hiring, and operations that let a home-service business scale past the founder.",
    confirmed: false,
  },
  {
    id: "blake-b-sells",
    name: "Blake B Sells",
    handle: "@blakeb_sells",
    focus: "Sales & Personal Brand",
    bio: "Sales-first creator building a personal brand alongside a home-service business, and teaching others to do the same.",
    confirmed: false,
  },
  {
    id: "andy-elliott",
    name: "Andy Elliott",
    handle: "@andyelliottofficial",
    focus: "Potential Headliner",
    bio: "High-energy sales trainer and closer with one of the largest audiences in sales education — in early conversations as a potential main-stage headliner.",
    confirmed: false,
  },
];
