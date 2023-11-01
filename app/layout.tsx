import "@/styles/global.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Nav from "@/components/nav/Nav";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Promptify",
  description: "Discover and share AI generated prompts",
};

const font = Inter({
  //weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
});

type Props = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <header>
            <Nav />
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
