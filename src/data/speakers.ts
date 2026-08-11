// Founding Creator Lineup — data-driven so names, bios, images, and
// confirmation status can be updated without touching any component.
//
// IMPORTANT: `confirmed` must stay `false` for every entry until that person
// has actually signed a speaker agreement. The UI intentionally renders no
// "confirmed" language anywhere for confirmed: false entries — do not add
// any copy elsewhere that implies otherwise.
//
// These are intentionally blank placeholder slots — we are in early
// conversations with creators/operators but nobody is signed, so no names
// are listed publicly yet. Replace each slot's `name`/`handle`/`focus`/`bio`
// as people are actually locked in, and flip `confirmed` to `true` once a
// speaker agreement is signed.

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
    id: "slot-1",
    name: "To Be Announced",
    handle: "",
    focus: "Reserved Slot",
    bio: "We're in conversations with creators and operators across the exterior-cleaning industry. This slot will be announced once someone is locked in.",
    confirmed: false,
  },
  {
    id: "slot-2",
    name: "To Be Announced",
    handle: "",
    focus: "Reserved Slot",
    bio: "We're in conversations with creators and operators across the exterior-cleaning industry. This slot will be announced once someone is locked in.",
    confirmed: false,
  },
  {
    id: "slot-3",
    name: "To Be Announced",
    handle: "",
    focus: "Reserved Slot",
    bio: "We're in conversations with creators and operators across the exterior-cleaning industry. This slot will be announced once someone is locked in.",
    confirmed: false,
  },
  {
    id: "slot-4",
    name: "To Be Announced",
    handle: "",
    focus: "Reserved Slot",
    bio: "We're in conversations with creators and operators across the exterior-cleaning industry. This slot will be announced once someone is locked in.",
    confirmed: false,
  },
  {
    id: "slot-5",
    name: "To Be Announced",
    handle: "",
    focus: "Reserved Slot",
    bio: "We're in conversations with creators and operators across the exterior-cleaning industry. This slot will be announced once someone is locked in.",
    confirmed: false,
  },
  {
    id: "slot-6",
    name: "To Be Announced",
    handle: "",
    focus: "Potential Headliner",
    bio: "We're in early conversations for a main-stage headliner. Announcement coming once something is locked in.",
    confirmed: false,
  },
];
