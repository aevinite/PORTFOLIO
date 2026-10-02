import type { Metadata } from "next";
import "./globals.css";
import { ProjectModalProvider } from "@/context/ProjectModalContext";
import StartProjectModal from "@/components/StartProjectModal";

const SITE_URL = "https://www.aevinite.com";
const TITLE = "Aevinite | Software that runs real businesses";
const DESCRIPTION =
  "Aevinite builds SaaS products, business software and automation for businesses that want to run better.";

// The preview image itself is src/app/opengraph-image.jpg (+ twitter-image.jpg); Next adds
// og:image / twitter:image for it. metadataBase turns it into the absolute URL that LinkedIn,
// WhatsApp and X need to show a preview card.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Aevinite",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ProjectModalProvider>
          {children}
          <StartProjectModal />
        </ProjectModalProvider>
      </body>
    </html>
  );
}
