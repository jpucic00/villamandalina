import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/navigation";
import Providers from "@/components/Providers";
import Analytics from "@/components/Analytics";
import { Newsreader, Manrope } from "next/font/google";

import "photoswipe/dist/photoswipe.css";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/style/site.css";
import "@/assets/style/calendar.css";

const serif = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://villamandalina.hr"),
  title: {
    default: "Villa Mandalina | Pool Villa Accommodation in Šibenik, Croatia",
    template: "%s | Villa Mandalina Šibenik",
  },
  description:
    "Holiday villa with a heated private pool and sea views in Šibenik, Dalmatia. 4 bedrooms, up to 10 guests, 2 km from the old town.",
  openGraph: {
    siteName: "Villa Mandalina",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
