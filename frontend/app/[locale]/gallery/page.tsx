import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/PageHeader";
import GalleryPage from "@/components/GalleryPage";
import Layout from "@/components/Layout";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  setRequestLocale(locale);
  const t = await getTranslations("galleryPage");
  const isHr = locale === "hr";
  const title = isHr ? "Galerija – fotografije vile i bazena u Šibeniku" : "Gallery – Photos of the Villa & Pool in Šibenik";
  const description = isHr
    ? "Razgledajte fotogaleriju Ville Mandalina — dnevni boravak, spavaće sobe, kupaonice, bazen i okolica u Šibeniku."
    : "Browse the photo gallery of Villa Mandalina — living room, bedrooms, bathrooms, pool and beautiful surroundings in Šibenik.";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Villa Mandalina`,
      description,
      url: `https://villamandalina.hr/${locale}/gallery`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Villa Mandalina`,
      description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://villamandalina.hr/${locale}/gallery`,
      languages: {
        en: "https://villamandalina.hr/en/gallery",
        hr: "https://villamandalina.hr/hr/gallery",
        "x-default": "https://villamandalina.hr/en/gallery",
      },
    },
  };
}

export default async function Gallery({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations("galleryPage");
  const isHr = locale === "hr";
  const description = isHr
    ? "Razgledajte fotogaleriju Ville Mandalina — dnevni boravak, spavaće sobe, kupaonice, bazen i okolica u Šibeniku."
    : "Browse the photo gallery of Villa Mandalina — living room, bedrooms, bathrooms, pool and beautiful surroundings in Šibenik.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: isHr ? "Galerija fotografija — Villa Mandalina" : "Photo Gallery — Villa Mandalina",
    description,
    url: `https://villamandalina.hr/${locale}/gallery`,
    about: {
      "@type": "LodgingBusiness",
      name: "Villa Mandalina",
      url: "https://villamandalina.hr",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `https://villamandalina.hr/${locale}/` },
        { "@type": "ListItem", position: 2, name: isHr ? "Galerija" : "Gallery", item: `https://villamandalina.hr/${locale}/gallery` },
      ],
    },
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <GalleryPage />
    </Layout>
  );
}
