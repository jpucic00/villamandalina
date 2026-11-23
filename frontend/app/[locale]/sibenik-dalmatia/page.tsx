import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Faq, { type FaqItem } from "@/components/Faq";
import { galleryImage } from "@/constants/galleryImages";
import { alternates, localeUrl } from "@/constants/site";
import { webPhotos, type PhotoCredit as Credit } from "@/constants/photoCredits";
import PhotoCredit from "@/components/PhotoCredit";

const PATH = "/sibenik-dalmatia";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "guide" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Villa Mandalina`,
      description,
      url: localeUrl(locale, PATH),
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: `${title} | Villa Mandalina`, description, images: ["/og-image.jpg"] },
    alternates: alternates(locale, PATH),
  };
}

type Place = { key: string; image: StaticImageData; credit?: Credit; position?: string };

const inTown: Place[] = [
  { key: "cathedral", image: galleryImage(135) },
  { key: "stNicholas", ...webPhotos.stNicholas },
  { key: "stAnthony", ...webPhotos.stAnthony },
];

const dayTrips: Place[] = [
  { key: "krka", ...webPhotos.krka },
  { key: "kornati", ...webPhotos.kornati },
];

export default async function GuidePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations("guide");
  const tPlaces = await getTranslations("attractions.items");
  const tCredit = await getTranslations("credits");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Villa Mandalina", item: localeUrl(locale) },
      { "@type": "ListItem", position: 2, name: t("title"), item: localeUrl(locale, PATH) },
    ],
  };

  const place = (p: Place, i: number) => (
    <article key={p.key} id={p.key} className={`guidePlace ${i % 2 === 1 ? "guidePlace--flip" : ""}`}>
      <div className="guidePlace__image">
        <Image src={p.image} style={{ objectPosition: p.position }} alt={tPlaces(`${p.key}.title`)} placeholder="blur" sizes="(max-width: 768px) 100vw, 50vw" className="cover" />
        {p.credit && <PhotoCredit credit={p.credit} label={tCredit("photo")} />}
      </div>
      <div className="guidePlace__text">
        <h3 className="h2">{tPlaces(`${p.key}.title`)}</h3>
        <p className="muted">{tPlaces(`${p.key}.text`)}</p>
      </div>
    </article>
  );

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <div className="container">
        <div className="heroImage__frame heroImage__frame--short">
          <Image src={webPhotos.sibenikWaterfront.image} alt={t("heroAlt")} priority placeholder="blur" sizes="(max-width: 768px) 100vw, 1360px" className="cover" />
          <PhotoCredit credit={webPhotos.sibenikWaterfront.credit} label={tCredit("photo")} />
        </div>
      </div>

      <section className="section container">
        <p className="eyebrow">{t("inTown")}</p>
        <div className="guidePlaces">{inTown.map(place)}</div>
      </section>

      <section className="section band band--paper">
        <div className="container">
          <p className="eyebrow">{t("dayTrips")}</p>
          <div className="guidePlaces">{dayTrips.map(place)}</div>
        </div>
      </section>

      <section className="section container grid12 guideNotes">
        <div className="guideNotes__item">
          <h2 className="h2">{t("beaches.title")}</h2>
          <p className="muted">{t("beaches.text")}</p>
        </div>
        <div className="guideNotes__item">
          <h2 className="h2">{t("base.title")}</h2>
          <p className="muted">{t("base.text")}</p>
        </div>
      </section>

      <Faq title={t("faq.title")} items={t.raw("faq.items") as FaqItem[]} />

      <section className="section band band--ink">
        <div className="container ctaBand">
          <div>
            <h2 className="h2">{t("cta.title")}</h2>
            <p>{t("cta.text")}</p>
          </div>
          <Link href="/calendar" className="btn btn--accent">
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
