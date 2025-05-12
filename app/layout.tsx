import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"; // Import global styles including Tailwind

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agri-Connect",
  description: "Connecting farmers and resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> {/* Default lang, will be overridden by locale layout */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}