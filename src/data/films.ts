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
  campus: {
    id: "campus-7-10-bus",
    title: "Campus Conveyance: the 7:10 bus",
    length: "1 min 26 s",
    duration: "PT1M26S",
    uploadDate: "2026-10-19",
    src: "/films/campus-7-10-bus.mp4",
    preview: "/films/campus-preview.mp4",
    poster: "/films/campus-7-10-bus.jpg",
    description:
      "One school morning by the clock: a student books her seat and pays by UPI, the driver's phone becomes the live bus, a parent gets \"your bus is 10 minutes away\", a QR scan at the door tells the family the child is on board, and the college, the agency and the admin each see their part.",
    // Read off the film (31 Oct 2026). Master: brag-output/campus_conveyance/output/01-the-7-10-bus-v1-4k.mp4
    chapters: [
      { label: "Where is the bus?", t: 0 },
      { label: "Book and pay", t: 23 },
      { label: "Live bus", t: 35.5 },
      { label: "On board", t: 50 },
      { label: "College", t: 58.5 },
      { label: "Agency", t: 67.5 },
      { label: "Admin", t: 74 },
    ] satisfies Chapter[],
  },
} as const;

export const FILM_CREDIT = "Music by Sascha Ende at ende.app (CC BY 4.0)";
