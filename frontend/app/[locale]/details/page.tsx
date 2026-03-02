import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import VillaDetailsPage from "@/components/VillaDetailsPage";
import Layout from "@/components/Layout";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  setRequestLocale(locale);
  const isHr = locale === "hr";
  const title = isHr ? "Detalji vile" : "Villa Details";
  const description = isHr
    ? "Villa Mandalina — 170m², 4 spavaće sobe, 4 kupaonice, privatni grijani bazen 19m², do 10 gostiju. Smještena 2 km od centra Šibenika s pogledom na more."
    : "Villa Mandalina — 170m², 4 bedrooms, 4 bathrooms, private heated pool 19m², up to 10 guests. Located 2 km from Šibenik city centre with sea views.";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Villa Mandalina`,
      description,
      url: `https://villamandalina.hr/${locale}/details`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Villa Mandalina`,
      description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://villamandalina.hr/${locale}/details`,
      languages: {
        en: "https://villamandalina.hr/en/details",
        hr: "https://villamandalina.hr/hr/details",
        "x-default": "https://villamandalina.hr/en/details",
      },
    },
  };
}

export default function Details({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const isHr = locale === "hr";
  const description = isHr
    ? "Villa Mandalina — 170m², 4 spavaće sobe, 4 kupaonice, privatni grijani bazen 19m², do 10 gostiju. Smještena 2 km od centra Šibenika s pogledom na more."
    : "Villa Mandalina — 170m², 4 bedrooms, 4 bathrooms, private heated pool 19m², up to 10 guests. Located 2 km from Šibenik city centre with sea views.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: "Villa Mandalina",
    description,
    url: `https://villamandalina.hr/${locale}/details`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Obala Jerka Šižgorića 13",
      addressLocality: "Šibenik",
      postalCode: "22000",
      addressCountry: "HR",
    },
    numberOfBedrooms: 4,
    numberOfBathroomsTotal: 4,
    floorSize: { "@type": "QuantitativeValue", value: 170, unitCode: "MTK" },
    occupancy: { "@type": "QuantitativeValue", minValue: 1, maxValue: 10 },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Private Heated Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "BBQ Grill", value: true },
      { "@type": "LocationFeatureSpecification", name: "Washing Machine", value: true },
      { "@type": "LocationFeatureSpecification", name: "Dishwasher", value: true },
    ],
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `https://villamandalina.hr/${locale}/` },
        { "@type": "ListItem", position: 2, name: isHr ? "Detalji vile" : "Villa Details", item: `https://villamandalina.hr/${locale}/details` },
      ],
    },
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VillaDetailsPage />
    </Layout>
  );
}
