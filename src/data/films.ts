import type { Chapter } from "@/components/FilmPlayer";

// The Aevidine product films (made from the real app; 4K masters live in brag-output). Used by the
// home page and /aevidine; each is also a VideoObject in /aevidine's JSON-LD.
export const FILMS = {
  onePlatform: {
    id: "one-platform",
    title: "Aevidine: one platform for the whole restaurant",
    length: "1 min 14 s",
    duration: "PT1M14S",
    uploadDate: "2026-10-08",
    src: "/films/aevidine-one-platform.mp4",
    preview: "/films/aevidine-preview.mp4",
    poster: "/films/aevidine-one-platform.jpg",
    description:
      "From paper tickets to one system: the guest orders by QR code, the kitchen gets the KOT, every table shows its status live, and the owner sees the day.",
    // Where each part of the film starts (read off the film itself, 31 Oct 2026).
    chapters: [
      { label: "The problem", t: 0 },
      { label: "Guests order", t: 24.5 },
      { label: "Kitchen", t: 37.5 },
      { label: "Every table, live", t: 42 },
      { label: "Bill and GST", t: 55.5 },
      { label: "Owner", t: 58 },
    ] satisfies Chapter[],
  },
  guestMenu: {
    id: "guest-menu",
    title: "Aevidine guest menu: from the QR code on the table to the kitchen",
    length: "3 min 24 s",
    duration: "PT3M24S",
    uploadDate: "2026-10-03",
    src: "/films/aevidine-guest-menu.mp4",
    poster: "/films/aevidine-guest-menu.jpg",
    description:
      "The guest scans the QR sticker, browses the menu with search and filters, opens each dish with its allergens, sees it in 3D, and orders; the allergy note reaches the kitchen ticket. Six languages.",
  },
} as const;

export const FILM_CREDIT = "Music by Sascha Ende at ende.app (CC BY 4.0)";
