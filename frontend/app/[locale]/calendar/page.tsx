import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CalendarPage from "@/components/CalendarPage";
import Layout from "@/components/Layout";

// Revalidate every 15 minutes so booked dates stay fresh
export const revalidate = 900;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  setRequestLocale(locale);
  const isHr = locale === "hr";
  const title = isHr ? "Provjeri dostupnost" : "Check Availability";
  const description = isHr
    ? "Provjerite slobodne termine i pošaljite zahtjev za rezervaciju Ville Mandalina u Šibeniku, Hrvatska."
    : "Check available dates and submit a reservation request for Villa Mandalina in Šibenik, Croatia.";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Villa Mandalina`,
      description,
      url: `https://villamandalina.hr/${locale}/calendar`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Villa Mandalina`,
      description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://villamandalina.hr/${locale}/calendar`,
      languages: {
        en: "https://villamandalina.hr/en/calendar",
        hr: "https://villamandalina.hr/hr/calendar",
        "x-default": "https://villamandalina.hr/en/calendar",
      },
    },
  };
}

export default function Calendar({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <Layout>
      <CalendarPage />
    </Layout>
  );
}
