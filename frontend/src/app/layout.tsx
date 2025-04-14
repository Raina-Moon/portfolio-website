import Header from "@/components/Layout/Header";
import "./globals.css";
import type { Metadata } from "next";

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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="pt-16">
        <Header />
        {children}
      </body>
    </html>
  );
}
