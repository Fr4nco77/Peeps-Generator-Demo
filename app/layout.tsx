import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tiffany = localFont({
  src: "../public/Tiffany.ttf",
  variable: "--tiffany",
});

export const metadata: Metadata = {
  title: "Peeps Generator",
  description:
    "Create, customize and download unique SVG avatars with Peeps Generator. Build peep characters programmatically or visually, export in multiple formats and integrate easily into your web projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tiffany.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
