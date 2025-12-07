import type { Metadata, Viewport } from "next";

import "./globals.css";
import "~/assets/css/cabinet-grotesk.css";
import { ThemeProvider } from "~/components/ThemeProvider";
import { Nav } from "~/components/Nav";
import { Footer } from "~/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Coming Soon | Dulranga Dhawanitha Portfolio",
  description:
    "Crafting exceptional digital experiences with clean code and thoughtful design. Dulranga Dhawanitha Portfolio launching soon.",
  keywords: [
    "frontend developer",
    "web developer",
    "react developer",
    "next.js",
    "typescript",
    "portfolio",
    "web design",
    "UI/UX",
  ],
  authors: [{ name: "Dulranga Dhawanitha" }],
  creator: "Dulranga Dhawanitha",
  publisher: "Dulranga Dhawanitha",
  metadataBase: new URL("https://dulranga.dev"), // Update with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Coming Soon | Frontend Developer Portfolio",
    description:
      "Crafting exceptional digital experiences with clean code and thoughtful design. Frontend developer portfolio launching soon.",
    siteName: "Frontend Developer Portfolio",
    images: [
      {
        url: "/og-image.png", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Frontend Developer Portfolio - Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coming Soon | Dulranga Dhawanitha Portfolio",
    description:
      "Crafting exceptional digital experiences with clean code and thoughtful design. Portfolio launching soon.",
    images: ["/og-image.png"], // Add your Twitter card image
    creator: "@dulrangaD", // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
