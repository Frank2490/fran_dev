import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Franciszek Solewicz - Developer",
  description: "Portfolio Franciszka Solewicza — developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
