// The company's public facts — ONE place. The About page, the JSON-LD "business card" in
// layout.tsx and the footer all read from here, so Google, ChatGPT and a visitor can never be
// told two different stories. public/llms.txt repeats them by hand: change it in the same commit.
// Source: the founders (2026-10-17), matching the LinkedIn company page.

export const COMPANY = {
  name: "Aevinite",
  legalStatus: "Not yet registered", // kept off the page; here so nobody adds "Pvt Ltd" by guesswork
  formerName: "Infinite",
  foundingDate: "2024-07-28",
  foundedLabel: "28 July 2024",
  renameDate: "2026-06-16",
  renamedLabel: "16 June 2026",
  city: "Ahmedabad",
  region: "Gujarat",
  country: "India",
  email: "rishi@aevinite.com",
  phoneDisplay: "+91 90997 23703",
  phoneE164: "+91-90997-23703",
  instagram: "https://www.instagram.com/aevinite/",
  linkedin: "https://www.linkedin.com/company/aevinite/",
  github: "https://github.com/aevinite",
  crunchbase: "https://www.crunchbase.com/organization/aevinite",
  medium: "https://medium.com/@aevinite",
  facebook: "https://www.facebook.com/61595132492927",
} as const;

export type Founder = {
  id: string; // anchor on /about and the JSON-LD @id
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  instagram: string;
  crunchbase: string;
};

export const FOUNDERS: Founder[] = [
  {
    id: "rishi-nakrani",
    name: "Rishi Nakrani",
    role: "Founder",
    bio: "Rishi started the company as Infinite in Ahmedabad on 28 July 2024 and led its rename to Aevinite in June 2026. He leads Aevinite and is the first point of contact for new clients.",
    linkedin: "https://www.linkedin.com/in/rishinakrani/",
    instagram: "https://www.instagram.com/rishi._.nakrani/",
    crunchbase: "https://www.crunchbase.com/person/rishi-nakrani",
  },
  {
    id: "jenish-patel",
    name: "Jenish Patel",
    role: "Co-Founder",
    bio: "Jenish co-founded Aevinite and works alongside Rishi helping the businesses they work with grow, through the websites, software and automation the company delivers.",
    linkedin: "https://www.linkedin.com/in/jenish-patel-a5608a398/",
    instagram: "https://www.instagram.com/jenish.16/",
    crunchbase: "https://www.crunchbase.com/person/jenish-patel-6ea2",
  },
];

// "Rishi Nakrani and Jenish Patel" — for sentences.
export const FOUNDER_NAMES = FOUNDERS.map((f) => f.name).join(" and ");

// Questions people (and AI assistants) actually ask about the company. Rendered on /about and
// emitted as FAQPage JSON-LD there, word for word — the two must stay identical.
export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Aevinite?",
    a: "Aevinite is a company based in Ahmedabad, Gujarat, India that helps businesses grow, with websites, software and automation built around how each business works. It also makes Aevidine, restaurant software.",
  },
  {
    q: "Who founded Aevinite?",
    a: "Aevinite was founded by Rishi Nakrani (Founder) and Jenish Patel (Co-Founder).",
  },
  {
    q: "When was Aevinite founded?",
    a: "Aevinite was founded on 28 July 2024 in Ahmedabad under the name Infinite, and was renamed Aevinite on 16 June 2026.",
  },
  {
    q: "Where is Aevinite based?",
    a: "Aevinite is based in Ahmedabad, Gujarat, India, and works with clients across India.",
  },
  {
    q: "What does the name Aevinite mean?",
    a: "Aevinite is derived from Aevum, a dimension of existence with a beginning but no end, and echoes the word Infinite, the company's original name. The name means \"the beginning with no end\"; the company's line is \"We help businesses grow.\"",
  },
  {
    q: "What has Aevinite built?",
    a: "Aevinite's work includes Aevidine, a complete restaurant platform with QR ordering, kitchen screens, billing and owner reports; a multispeciality hospital website; the 4D Dish Explorer, an interactive 3D dish viewer; HackJudge, a hackathon judging platform; and scroll-driven 3D brand showcases.",
  },
  {
    q: "How can I contact Aevinite?",
    a: "Email rishi@aevinite.com, call or WhatsApp +91 90997 23703, or use the contact form at aevinite.com/contact.",
  },
];
