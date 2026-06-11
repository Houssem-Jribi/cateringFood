import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Platter Catering | Premium Corporate Catering for Companies",
  description:
    "Platter Catering provides premium corporate catering for meetings, conferences, office lunches, product launches, and business events. Request a custom B2B quote today.",
  keywords: [
    "corporate catering",
    "business catering",
    "office catering",
    "company catering",
    "corporate event catering",
    "conference catering",
    "office lunch catering",
    "B2B catering services",
    "corporate buffet catering",
  ],
  openGraph: {
    title: "Platter Catering | Premium Corporate Catering for Companies",
    description:
      "Premium corporate catering solutions for meetings, conferences, office lunches, and business events.",
    type: "website",
    siteName: "Platter Catering",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platter Catering | Premium Corporate Catering",
    description: "Premium B2B catering for corporate events and business occasions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              name: "Platter Catering",
              description:
                "Premium corporate catering for meetings, conferences, office lunches, and business events.",
              servesCuisine: "Corporate Catering",
              priceRange: "$$$$",
              url: "https://plattercatering.com",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#fff8ed] text-[#263128] antialiased overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
