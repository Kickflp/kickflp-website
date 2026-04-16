import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KICKFLP — The World Best Action Sports Streaming",
  description: "Stream skateboarding, surfing, BMX, motocross and more. Join the KICKFLP waitlist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
