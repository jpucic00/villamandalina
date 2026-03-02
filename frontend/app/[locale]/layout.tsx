import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/navigation";
import Providers from "@/components/Providers";

// Global styles — imported here so they apply to all pages
import "@/assets/style/landingPage.css";
import "@/assets/style/heading.css";
import "@/assets/style/navigationBar.css";
import "@/assets/style/highlighted.css";
import "@/assets/style/reviews.css";
import "@/assets/style/moreAttractions.css";
import "@/assets/style/moreDetails.css";
import "@/assets/style/gallery.css";
import "@/assets/style/galleryComps.css";
import "@/assets/style/contact.css";
import "@/assets/style/location.css";
import "@/assets/style/CalendarElement.css";
import "@/assets/style/reactCalendar.css";
import "@/assets/style/login.css";
import "@/assets/style/footer.css";
import "@/assets/style/languageSelector.css";
import "@/assets/style/villaDetails.css";
import "@/assets/style/confirmPopup.css";
import "@/assets/style/slick-custom.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "photoswipe/dist/photoswipe.css";
import "react-toastify/dist/ReactToastify.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "Villa Mandalina | Luxury Holiday Villa in Šibenik, Croatia",
    template: "%s | Villa Mandalina Šibenik",
  },
  description:
    "Experience the perfect Mediterranean getaway at Villa Mandalina. A stunning holiday villa with private pool, modern amenities, and breathtaking views in Šibenik, Croatia.",
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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
