import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { StateProvider } from "@/app/providers/store/provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Who Wants to Be a Millionaire?",
  description: "Try to become a millionaire!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}
