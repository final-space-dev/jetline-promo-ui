import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jetline Promo",
  description: "Standard Products Selection",
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
