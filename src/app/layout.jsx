import SiteLayout from "@/components/layout/SiteLayout";
import { Poppins } from "next/font/google";
import { siteInfo } from "@/data/site";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: `${siteInfo.name} | Flights, Hotels, Holidays, Bus & Visa`,
    template: `%s | ${siteInfo.name}`,
  },
  description: siteInfo.description,
  keywords: [
    "Meera Tours",
    "flight booking",
    "hotel booking",
    "holiday packages",
    "bus tickets",
    "visa services",
    "Nashik travel agency",
  ],
  openGraph: {
    title: siteInfo.name,
    description: siteInfo.description,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={poppins.className}>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
