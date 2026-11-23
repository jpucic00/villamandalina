import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { galleryImage } from "@/constants/galleryImages";
import Facts from "./Facts";
import PageHeader from "./PageHeader";

const sections = [
  { titleKey: "interior", items: ["bedrooms", "livingRoom", "kitchen", "bathrooms"], image: 114 },
  { titleKey: "exteriorPool", items: ["poolArea", "outdoorSpace"], image: 139 },
  { titleKey: "locationDistances", items: ["nearbyAmenities", "travelDistances"], image: 120 },
  { titleKey: "activitiesExperiences", items: ["atTheVilla", "inTheArea"], image: 124 },
] as const;

export default async function VillaDetailsPage() {
  const t = await getTranslations("villaDetails");
  const tPage = await getTranslations("detailsPage");

  return (
    <>
      <PageHeader eyebrow={tPage("eyebrow")} title={tPage("title")} intro={t("introText")} />
      <div className="container factsWrap factsWrap--flush">
        <Facts />
      </div>

      <section className="section container grid12 about">
        <div className="about__image">
          <Image
            src={galleryImage(125)}
            alt="Villa Mandalina with its private pool"
            placeholder="blur"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="cover"
          />
        </div>
        <div className="about__text">
          <h2 className="h2">{t("aboutTitle")}</h2>
          {t("description")
            .split("\n\n")
            .map((p) => (
              <p key={p} className="muted">
                {p}
              </p>
            ))}
        </div>
      </section>

      {sections.map((section, i) => (
        <section key={section.titleKey} className={`section ${i % 2 === 0 ? "band band--paper" : ""}`}>
          <div className="container grid12 detailBlock">
            <div className="detailBlock__head">
              <h2 className="h2">{t(`sections.${section.titleKey}`)}</h2>
              <div className="detailBlock__image">
                <Image
                  src={galleryImage(section.image)}
                  alt={t(`sections.${section.titleKey}`)}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="cover"
                />
              </div>
            </div>
            <div className="detailBlock__lists">
              {section.items.map((key) => (
                <div key={key} className="detailList">
                  <h3 className="h3">{t(`categories.${key}`)}</h3>
                  <ul>
                    {(t.raw(`details.${key}`) as string[]).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section container grid12 detailBlock">
        <h2 className="h2 detailBlock__head">{t("houseRules.title")}</h2>
        <ul className="rules detailBlock__lists">
          {(t.raw("houseRules.rules") as string[]).map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      <section className="section band band--ink">
        <div className="container ctaBand">
          <div>
            <h2 className="h2">{t("cta.title")}</h2>
            <p>{t("cta.text")}</p>
          </div>
          <div className="btnRow">
            <Link href="/calendar" className="btn btn--accent">
              {t("cta.checkAvailability")}
            </Link>
            <Link href="/contact" className="btn btn--outlineLight">
              {t("cta.contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
