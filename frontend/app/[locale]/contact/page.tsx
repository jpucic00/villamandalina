import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ContactPage from "@/components/ContactPage";
import Layout from "@/components/Layout";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  setRequestLocale(locale);
  const isHr = locale === "hr";
  const title = isHr ? "Kontakt" : "Contact";
  const description = isHr
    ? "Kontaktirajte nas za rezervacije i upite o Villi Mandalina u Šibeniku. Pišite nam ili nazovite — odgovaramo brzo!"
    : "Contact Villa Mandalina in Šibenik for booking enquiries and questions. Send us a message or call us — we respond quickly!";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Villa Mandalina`,
      description,
      url: `https://villamandalina.hr/${locale}/contact`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Villa Mandalina`,
      description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://villamandalina.hr/${locale}/contact`,
      languages: {
        en: "https://villamandalina.hr/en/contact",
        hr: "https://villamandalina.hr/hr/contact",
        "x-default": "https://villamandalina.hr/en/contact",
      },
    },
  };
}

export default function Contact({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const isHr = locale === "hr";
  const description = isHr
    ? "Kontaktirajte nas za rezervacije i upite o Villi Mandalina u Šibeniku. Pišite nam ili nazovite — odgovaramo brzo!"
    : "Contact Villa Mandalina in Šibenik for booking enquiries and questions. Send us a message or call us — we respond quickly!";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Villa Mandalina",
    url: "https://villamandalina.hr",
    description,
    telephone: ["+38599803841", "+38598846520"],
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
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+38599803841",
      contactType: "reservations",
      availableLanguage: ["English", "Croatian"],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `https://villamandalina.hr/${locale}/` },
        { "@type": "ListItem", position: 2, name: isHr ? "Kontakt" : "Contact", item: `https://villamandalina.hr/${locale}/contact` },
      ],
    },
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPage />
    </Layout>
  );
}
