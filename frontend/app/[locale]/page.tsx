import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HighlightedParts from "@/components/HighlightedParts";
import Reviews from "@/components/Reviews";
import MoreAttractions from "@/components/MoreAttractions";
import MoreDetails from "@/components/MoreDetails";
import Layout from "@/components/Layout";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isHr = locale === "hr";
  const title = isHr
    ? "Villa Mandalina | Luksuzna holiday vila u Šibeniku, Hrvatska"
    : "Villa Mandalina | Luxury Holiday Villa in Šibenik, Croatia";
  const description = isHr
    ? "Doživite savršen mediteranski odmor u Villi Mandalina. Prekrasna holiday vila s privatnim bazenom, modernim sadržajima i zadivljujućim pogledom u Šibeniku, Hrvatska."
    : "Experience the perfect Mediterranean getaway at Villa Mandalina. A stunning holiday villa with private pool, modern amenities, and breathtaking views in Šibenik, Croatia.";

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
    alternates: {
      canonical: `https://villamandalina.hr/${locale}/`,
      languages: {
        en: "https://villamandalina.hr/en/",
        hr: "https://villamandalina.hr/hr/",
        "x-default": "https://villamandalina.hr/en/",
      },
    },
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
    telephone: "+38599803841",
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
      reviewCount: "5",
    },
  };

  return (
    <Layout isHomePage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HighlightedParts />
      <Reviews />
      <MoreAttractions />
      <MoreDetails />
    </Layout>
  );
}
