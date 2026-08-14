import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { AttributionCapture } from "@/components/attribution/AttributionCapture";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EXTERIOR CON 2027 | Build · Scale · Dominate",
  description:
    "EXTERIOR CON is the premium business summit for exterior-cleaning entrepreneurs. Phoenix, Arizona · February 26–28, 2027. Build. Scale. Dominate.",
  metadataBase: new URL("https://exteriorcon.com"),
  openGraph: {
    title: "EXTERIOR CON 2027 | Build · Scale · Dominate",
    description:
      "The premium business summit for exterior-cleaning entrepreneurs. Feb 26–28, 2027 · Phoenix, AZ.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-bone">
        <AttributionCapture />
        {children}
      </body>
    </html>
  );
}
