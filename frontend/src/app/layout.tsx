import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raina Moon's Portfolio",
  description:
    "Discover the creative portfolio of Raina Moon (Raina To The Moon), featuring innovative projects, professional experiences, and insights into the world of creative technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
