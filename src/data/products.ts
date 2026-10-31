import { FILMS } from "@/data/films";
import type { Tone } from "@/components/ui";

// Aevinite's two products of its own. The home page, the menu and the footer all read this, so a
// product's name, colour, film and screens are written once. Each product page (/aevidine,
// /campus) adds its own long text for search engines.

export type Product = {
  id: "aevidine" | "campus";
  name: string;
  /** Name split so the second half can wear the product's colour in big headlines. */
  nameParts: [string, string];
  href: string;
  tone: Tone;
  mark?: string;
  kind: string;
  line: string;
  headline: [string, string, string]; // before, coloured word, after
  sub: string;
  status: string;
  film: { src: string; preview: string; poster: string; title: string; chapters: readonly { label: string; t: number }[] };
  screens: { who: string; line: string; img: string }[];
};

export const PRODUCTS: Product[] = [
  {
    id: "aevidine",
    name: "Aevidine",
    nameParts: ["Aevi", "dine"],
    href: "/aevidine",
    tone: "gold",
    kind: "Restaurant software",
    line: "QR ordering, kitchen screen and KOT, live tables, GST bills and owner reports, in one system.",
    headline: ["Aevidine runs the ", "whole", " restaurant."],
    sub: "QR ordering at the table, the kitchen screen and KOT printing, live tables, GST bills and the owner's reports. One system instead of six different things.",
    status: "Live at its first restaurant",
    film: FILMS.onePlatform,
    screens: [
      { who: "Guest", line: "Scans the QR on the table and orders from their own phone. No app to download.", img: "/films/aevidine-screens/guest.webp" },
      { who: "Kitchen", line: "Gets every order the moment it's placed, on the kitchen screen and as a printed KOT.", img: "/films/aevidine-screens/kitchen.webp" },
      { who: "Waiter", line: "Sees every table live: new order, cooking, served, bill still open.", img: "/films/aevidine-screens/waiter.webp" },
      { who: "Manager", line: "Runs the floor and the day's bills. GST is worked out on every bill.", img: "/films/aevidine-screens/manager.webp" },
      { who: "Owner", line: "Sees the day's sales and reports live, from anywhere.", img: "/films/aevidine-screens/owner.webp" },
    ],
  },
  {
    id: "campus",
    name: "Campus Conveyance",
    nameParts: ["Campus ", "Conveyance"],
    href: "/campus",
    tone: "amber",
    mark: "/campus-mark.webp",
    kind: "Student transport app",
    line: "Book a seat, pay by UPI, watch the bus live, and know the moment your child is on board.",
    headline: ["Every school ride, on ", "one", " screen."],
    sub: "Students and parents book and pay, the driver's phone becomes the live bus, a QR scan at the door tells the family, and the college, the transport agency and the admin each see their part.",
    status: "Built for the web and Android",
    film: FILMS.campus,
    screens: [
      { who: "Student", line: "Picks her college, route and seat, pays by UPI, and carries her pass as a QR code.", img: "/films/campus-screens/student.webp" },
      { who: "Parent", line: "Gets \"your bus is 10 minutes away\", and a notice the second the child boards.", img: "/films/campus-screens/parent.webp" },
      { who: "Driver", line: "Goes online and their phone becomes the bus, live on every map. Scans passes at the door.", img: "/films/campus-screens/driver.webp" },
      { who: "College", line: "Watches every bus on its way to campus, with every rider and route.", img: "/films/campus-screens/college.webp" },
      { who: "Agency", line: "Runs the whole fleet: routes, buses, riders, bookings, refunds and every rupee.", img: "/films/campus-screens/agency.webp" },
      { who: "Admin", line: "Checks every payment before a seat is confirmed.", img: "/films/campus-screens/admin.webp" },
    ],
  },
];

export const productById = (id: Product["id"]) => PRODUCTS.find((p) => p.id === id)!;
