// The Guides: plain answers to the questions restaurant owners ask, written to the searches ChatGPT
// ran for them (its search log, 31 Oct 2026: "restaurant QR code ordering software India pricing
// features 2026", "restaurant management software Ahmedabad KOT billing restaurant POS"). AI assistants
// quote pages that answer the question directly, so each guide opens with the answer, then the detail.
// Facts only: no tax rate or legal threshold is stated that we have not checked — those go to "ask your CA".

export type Guide = {
  slug: string;
  title: string; // also the <h1> and the search title
  description: string; // meta description = the one-paragraph answer
  published: string; // ISO date
  readMinutes: number;
  answer: string; // the first paragraph: the direct answer
  sections: { heading: string; paragraphs?: string[]; list?: string[] }[];
  aevidine: string; // the short "how Aevidine does it" close
  faq: { q: string; a: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "qr-code-ordering-for-restaurants-india",
    title: "QR Code Ordering for Restaurants in India: How It Works and What to Check",
    description:
      "QR code ordering lets guests scan a code on their table, see the menu on their phone and place the order themselves; the order goes straight to the kitchen. Here is how it works, what it changes and what to check before you choose one.",
    published: "2026-10-31",
    readMinutes: 6,
    answer:
      "QR code ordering lets a guest scan a code stuck on the table, open the restaurant's menu on their own phone and place the order themselves. The order reaches the kitchen at once and is added to that table's bill. Nobody has to download an app: the menu opens in the phone's browser.",
    sections: [
      {
        heading: "How QR code ordering works, step by step",
        list: [
          "Each table gets its own QR code. The code carries the table, so every order knows where it came from.",
          "The guest scans it with the phone camera and the menu opens in the browser, with categories, photos, prices and veg / non-veg marks.",
          "The guest adds dishes, writes a note (\"less spicy\", \"no onion\") and sends the order.",
          "The kitchen receives it immediately, as a KOT (kitchen order ticket) on a kitchen screen or a printer.",
          "Waiters and the counter see the same order on the table, so the bill is ready when the guest asks for it.",
        ],
      },
      {
        heading: "What changes for the restaurant",
        paragraphs: [
          "The biggest change is that orders stop depending on a waiter being free. On a busy night a table can order the moment it has decided, and add a second round without waving anyone over. Orders also arrive written exactly as the guest chose them, so fewer dishes go back because of a misheard order.",
          "Waiters do not disappear: they still seat guests, serve, help people who prefer to order by talking, and take orders on a tablet for those tables. QR ordering removes the walking back and forth to write orders down and carry them to the kitchen.",
          "A digital menu can also be changed in seconds: a dish that runs out can be hidden for the rest of the night, and a price can be updated without reprinting cards.",
        ],
      },
      {
        heading: "What to check before you choose a QR ordering system",
        list: [
          "No app for the guest. If guests have to install something, most will not. The menu should open straight from the camera.",
          "Orders go to the kitchen by themselves. Some \"QR menus\" are only a picture of the menu; ordering still needs a waiter. Check that a scanned order reaches the kitchen without anyone retyping it.",
          "It keeps working when the internet is weak. Ask what happens to an order if the connection drops for a minute during a rush.",
          "One bill per table, from every source. Orders from the QR menu and from waiters should land on the same table and the same bill.",
          "Proper bills. The same system should print bills and GST invoices, so the night's orders and the night's sales match.",
          "Your own branding. The menu guests see should carry your restaurant's name, colours and logo, not the software company's.",
          "Who can change what. Staff should only see the parts of the system their job needs.",
        ],
      },
      {
        heading: "What it costs",
        paragraphs: [
          "Prices in India vary widely: some QR menus are free but only display the menu, while full systems that include ordering, kitchen screens, billing and reports are usually a monthly subscription. When you compare prices, compare what is included — ordering, KOT printing, billing, GST invoices, reports and support — rather than the headline number.",
        ],
      },
    ],
    aevidine:
      "Aevidine, the restaurant software made by Aevinite in Ahmedabad, works this way: the guest scans the table's QR code and orders from the phone with no app, the kitchen gets the KOT on its screen and printer, waiters and the counter share the same table bill, and the screens keep working when the internet drops.",
    faq: [
      {
        q: "Do guests need to install an app to order by QR code?",
        a: "They should not have to. A good QR ordering system opens the menu straight in the phone's browser after the guest scans the code with the camera.",
      },
      {
        q: "Does QR ordering replace waiters?",
        a: "No. Waiters still seat and serve guests and take orders for people who prefer to talk; QR ordering removes the trips to write orders down and carry them to the kitchen.",
      },
      {
        q: "How does the kitchen receive a QR order?",
        a: "As a KOT (kitchen order ticket), shown on a kitchen screen or printed on the kitchen printer the moment the guest sends the order.",
      },
      {
        q: "What happens to orders if the internet goes down?",
        a: "It depends on the system. Ask before you choose: a well-built one keeps the order and sends it as soon as the connection is back.",
      },
    ],
  },
  {
    slug: "what-is-a-kot-kitchen-order-ticket",
    title: "What Is a KOT (Kitchen Order Ticket)? And When to Move to a Kitchen Screen",
    description:
      "A KOT, or kitchen order ticket, is the slip that tells the kitchen what to cook for which table. Here is what a KOT contains, how restaurants use it, and when a kitchen screen works better than paper.",
    published: "2026-10-31",
    readMinutes: 5,
    answer:
      "A KOT (kitchen order ticket) is the slip that tells the kitchen what to cook: the table or order number, each dish with its quantity, any notes such as \"no onion\", and the time it was ordered. It is printed or shown in the kitchen the moment an order is placed, and the kitchen cooks from it.",
    sections: [
      {
        heading: "What a KOT shows",
        list: [
          "The KOT number, so the kitchen and the floor can talk about the same ticket.",
          "The table number, or that it is a takeaway or delivery order.",
          "Each dish and how many, with its size or variant.",
          "Notes from the guest: spice level, \"no onion\", allergies.",
          "The time it was sent, so the oldest orders are cooked first.",
          "Who took the order, in many systems.",
        ],
      },
      {
        heading: "A KOT is not a bill",
        paragraphs: [
          "The KOT goes to the kitchen and carries no prices; the bill goes to the guest and carries prices and tax. A table often has several KOTs in one visit — starters, then mains, then dessert — and one bill at the end that adds them all up. Keeping the two separate is what lets the kitchen work from the order while the counter works from the money.",
        ],
      },
      {
        heading: "Paper KOT or kitchen screen?",
        paragraphs: [
          "Paper KOTs from a thermal printer are cheap, reliable and familiar; many kitchens will always want one. Their weak points are that a slip can be lost or splashed, nobody outside the kitchen can see which dishes are ready, and a change to an order means a second slip that can be missed.",
          "A kitchen screen (often called a KDS, kitchen display system) shows the same tickets on a tablet or monitor. Cooks mark dishes as being prepared or ready, and the waiters' screens show it at once, so they know when to pick up. Old tickets stand out by colour, and changes appear on the ticket itself.",
          "Many restaurants use both: the screen for tracking and a printer for the cook who likes paper. The important part is that the order reaches the kitchen without anyone retyping it.",
        ],
      },
      {
        heading: "Signs it is time to move from handwritten tickets",
        list: [
          "Dishes go out wrong because a handwritten order was misread.",
          "Waiters walk to the kitchen just to ask whether a dish is ready.",
          "Tickets get lost on busy nights, and a table waits for food nobody started.",
          "The kitchen cannot tell which order came first.",
        ],
      },
    ],
    aevidine:
      "In Aevidine, every order — from the guest's QR menu or the waiter's tablet — becomes a KOT on the kitchen screen and, if you want paper, on the kitchen printer, with the guest's notes and allergies on the ticket. When the kitchen marks a dish ready, the waiters see it straight away.",
    faq: [
      {
        q: "What is the full form of KOT in a restaurant?",
        a: "KOT stands for kitchen order ticket: the slip or screen ticket that tells the kitchen what to cook for which table.",
      },
      {
        q: "What is the difference between a KOT and a bill?",
        a: "A KOT goes to the kitchen and lists dishes without prices; a bill goes to the guest and lists prices and tax. One visit can have several KOTs and one bill.",
      },
      {
        q: "What is a KDS?",
        a: "A KDS (kitchen display system) is a screen in the kitchen that shows KOTs digitally, so cooks can mark dishes ready and waiters can see it at once.",
      },
    ],
  },
  {
    slug: "restaurant-gst-bill-checklist-india",
    title: "What a Restaurant Bill in India Must Show: A GST Bill Checklist",
    description:
      "A checklist of what a GST-registered restaurant's bill in India must show — GSTIN, a unique invoice number, the date, items, tax and total — and how to handle a cancelled or wrong bill. Check the details with your CA.",
    published: "2026-10-31",
    readMinutes: 6,
    answer:
      "A GST-registered restaurant in India must give a tax invoice that shows its name, address and GSTIN; a unique, consecutive invoice number; the date; what was sold with quantities and values; the tax charged; and the total. The full list of required details is in Rule 46 of the CGST Rules; your CA can confirm which apply to your restaurant.",
    sections: [
      {
        heading: "The checklist",
        list: [
          "Restaurant name, address and GSTIN (if registered under GST).",
          "A tax invoice number that is unique for the financial year and runs in sequence. Rule 46 caps it at 16 characters; letters, numbers, \"-\" and \"/\" are allowed.",
          "The date of the invoice.",
          "Each item with its quantity and value; the SAC or HSN code where it is required.",
          "The taxable value, the tax rate and the tax amount, split into CGST and SGST (or IGST) as it applies.",
          "Discounts shown separately, so the taxable value is clear.",
          "The total payable.",
          "The customer's name and GSTIN when a registered business asks for a GST invoice to claim credit.",
        ],
      },
      {
        heading: "Which GST rate applies",
        paragraphs: [
          "The rate depends on the kind of restaurant (for example a standalone restaurant or one inside a hotel) and on rules that change from time to time. We do not quote a rate here on purpose: ask your CA which rate applies to you, and make sure your billing system lets you set it rather than guessing it.",
        ],
      },
      {
        heading: "When a bill is wrong or cancelled",
        paragraphs: [
          "An issued tax invoice should not be deleted, edited or renumbered. If a sale is cancelled or changed after the invoice was issued, the correction is made with a credit note (or a debit note) that refers to the original invoice. A bill that is cancelled before any tax invoice is issued simply never takes an invoice number.",
          "This is also why the invoice number series matters: a missing number in the sequence is the first thing that raises questions in an audit.",
        ],
      },
      {
        heading: "Daily bill numbers and invoice numbers",
        paragraphs: [
          "Many restaurants use two numbers: a short bill or token number that starts again every day, which staff use on the floor, and the tax invoice number, which runs for the whole financial year and never repeats. Both can appear on the printed bill; the invoice number is the one that counts for GST.",
        ],
      },
    ],
    aevidine:
      "Aevidine prints bills and GST invoices from the same orders the kitchen cooked, with the invoice number series running for the year, discounts shown apart from the total, and corrections made with a credit note instead of editing an issued invoice.",
    faq: [
      {
        q: "What must a restaurant GST bill show in India?",
        a: "The restaurant's name, address and GSTIN; a unique consecutive invoice number; the date; the items with quantities and values; the taxable value, rate and tax (CGST/SGST or IGST); and the total. Rule 46 of the CGST Rules has the full list.",
      },
      {
        q: "How long can a GST invoice number be?",
        a: "Up to 16 characters, unique for the financial year and in sequence. Letters, numbers, hyphens and slashes can be used.",
      },
      {
        q: "Can a restaurant delete or edit a GST bill?",
        a: "An issued tax invoice should not be deleted or edited. A cancelled or changed sale is corrected with a credit note (or debit note) linked to the original invoice.",
      },
    ],
  },
];

export const guidePath = (g: Guide) => `/guides/${g.slug}`;
