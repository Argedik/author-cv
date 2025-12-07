import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Aytekin Tank - Books",
  description: "More Books from Aytekin Tank",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  );
}
