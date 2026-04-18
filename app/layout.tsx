import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KICKFLP · Motion > Fear",
  description: "Stream the world's best action sports. Skateboarding, surfing, BMX, motocross and more. Join the KICKFLP community.",
  keywords: "action sports, skateboarding, surfing, BMX, motocross, athlete discovery, KICKFLP, streaming",
  metadataBase: new URL('https://kickflp.com'),
  alternates: {
    canonical: 'https://kickflp.com',
  },
  openGraph: {
    title: "KICKFLP · Motion > Fear",
    description: "The platform where undiscovered athletes get seen. Stream action sports. Join the waitlist.",
    url: "https://kickflp.com",
    siteName: "KICKFLP",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KICKFLP · Motion > Fear",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KICKFLP · Motion > Fear",
    description: "The platform where undiscovered athletes get seen. Stream action sports. Join the waitlist.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#000000' }}>
        {children}
      </body>
    </html>
  );
}
