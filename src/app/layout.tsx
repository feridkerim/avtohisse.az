import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "avtohisse.az – Avtomobil ehtiyat hissələri bazarı",
    template: "%s | avtohisse.az",
  },
  description:
    "Avtomobil hissələri, yağlar, filtrlər və aksesuarları avtohisse.az-da tapın. Premium və son elanlar, rahat filtr və axtarış sistemi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body
        className={`${montserrat.variable} antialiased font-sans bg-white text-neutral-900`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
