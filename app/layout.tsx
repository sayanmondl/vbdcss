import type { Metadata } from "next";
import { Barlow_Condensed, Teko } from "next/font/google";
import "./globals.css";

const barlow = Barlow_Condensed({
  weight: ["400", "500"],
  variable: "--font-barlow",
  subsets: ["latin"]
});

const teko = Teko({
  weight: ["400", "500"],
  variable: "--font-teko",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Department of Computer and System Sciences",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${teko.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
