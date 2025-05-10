import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Concert Tracked",
  description: "Keep track of all the concerts and shows you've been to.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
