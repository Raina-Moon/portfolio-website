import Header from "@/components/Layout/Header";
import "./globals.css";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
      <link rel="icon" href="/images/image_01.png"/>
      </head>
      <body className="pt-16">
        <Header />
        <ToastContainer position="top-center" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}
