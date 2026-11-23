import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Layout from "@/components/Layout";
import {
  Hero,
  Welcome,
  DayAtTheVilla,
  Inside,
  Reviews,
  Explore,
  LocationSection,
  HomeFaq,
  ClosingCta,
} from "@/components/home/HomeSections";
import { PHONES, alternates } from "@/constants/site";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isHr = locale === "hr";
  const title = isHr
    ? "Villa Mandalina | Smještaj u Šibeniku – vila s grijanim bazenom"
    : "Villa Mandalina | Šibenik Villa with Heated Pool – Accommodation in Croatia";
  const description = isHr
    ? "Obiteljska vila za odmor u Šibeniku, Dalmacija: grijani privatni bazen, pogled na more, 4 spavaće sobe za do 10 gostiju, 2 km od stare jezgre."
    : "Family holiday villa in Šibenik, Dalmatia: heated private pool, sea views, 4 bedrooms for up to 10 guests, 2 km from the old town. Your base for a Croatian coast vacation.";

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: `https://villamandalina.hr/${locale}/`,
      type: "website",
      locale: isHr ? "hr_HR" : "en_US",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Villa Mandalina Šibenik" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    alternates: alternates(locale),
  };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  // JSON-LD structured data for the villa (LodgingBusiness / VacationRental)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "VacationRental"],
    name: "Villa Mandalina",
    description:
      "Luxury holiday villa with private heated pool, 4 bedrooms, 4 bathrooms and sea views, located 2 km from Šibenik city center, Croatia.",
    url: "https://villamandalina.hr",
    image: "https://villamandalina.hr/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Obala Jerka Šižgorića 13",
      addressLocality: "Šibenik",
      postalCode: "22000",
      addressCountry: "HR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.7352,
      longitude: 15.8936,
    },
    telephone: PHONES[0].tel,
    numberOfRooms: 4,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Private Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "BBQ Grill", value: true },
      { "@type": "LocationFeatureSpecification", name: "Dishwasher", value: true },
    ],
    checkinTime: "16:00",
    checkoutTime: "10:00",
    petsAllowed: false,
    priceRange: "€€€",
    containsPlace: {
      "@type": "Accommodation",
      name: "Villa Mandalina",
      floorSize: { "@type": "QuantitativeValue", value: 170, unitCode: "MTK" },
      occupancy: { "@type": "QuantitativeValue", minValue: 1, maxValue: 10 },
      numberOfBathroomsTotal: 4,
      numberOfBedrooms: 4,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "5",
    },
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Welcome />
      <DayAtTheVilla />
      <Inside />
      <Reviews />
      <Explore />
      <LocationSection />
      <HomeFaq />
      <ClosingCta />
    </Layout>
  );
}
