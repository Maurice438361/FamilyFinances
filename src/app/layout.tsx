import type { Metadata } from 'next';
import './globals.css';

import { Roboto_Flex } from "next/font/google";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Family Finances',
  description: 'Track your family finances',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={robotoFlex.className}>{children}</body>
    </html>
  );
}

