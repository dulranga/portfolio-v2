import type { Metadata } from "next";

import "./globals.css";
import "~/assets/css/cabinet-grotesk.css";

export const metadata: Metadata = {
  title: "Coming Soon | Frontend Developer",
  description: "Crafting exceptional digital experiences. Coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700,400,300,200,100,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
