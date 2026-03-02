"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

const highlights = [
  { icon: "🏠", title: "170m²", subtitleKey: "livingSpace" },
  { icon: "🛏️", title: "4", subtitleKey: "bedrooms" },
  { icon: "🚿", title: "4", subtitleKey: "bathrooms" },
  { icon: "🏊", title: "19m²", subtitleKey: "heatedPool" },
  { icon: "👥", title: "10", subtitleKey: "maxGuests" },
  { icon: "🚗", titleKey: "free", subtitleKey: "parking" },
];

const sections = [
  {
    titleKey: "interior",
    items: [
      { categoryKey: "bedrooms", detailsKey: "bedrooms" },
      { categoryKey: "livingRoom", detailsKey: "livingRoom" },
      { categoryKey: "kitchen", detailsKey: "kitchen" },
      { categoryKey: "bathrooms", detailsKey: "bathrooms" },
    ],
  },
  {
    titleKey: "exteriorPool",
    items: [
      { categoryKey: "poolArea", detailsKey: "poolArea" },
      { categoryKey: "outdoorSpace", detailsKey: "outdoorSpace" },
    ],
  },
  {
    titleKey: "locationDistances",
    items: [
      { categoryKey: "nearbyAmenities", detailsKey: "nearbyAmenities" },
      { categoryKey: "travelDistances", detailsKey: "travelDistances" },
    ],
  },
  {
    titleKey: "activitiesExperiences",
    items: [
      { categoryKey: "atTheVilla", detailsKey: "atTheVilla" },
      { categoryKey: "inTheArea", detailsKey: "inTheArea" },
    ],
  },
];

export default function VillaDetailsPage() {
  const { width } = useWindowDimensions();
  const device = deviceCheck(width);
  const t = useTranslations();

  return (
    <div className={`villaDetailsPage ${device}`}>
      <h1 className={`villaDetailsH1 ${device}`} style={{ display: "none" }}>
        Villa Mandalina
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`villaDetailsIntro ${device}`}
      >
        <p className={`villaDetailsIntroText ${device}`}>{t("villaDetails.introText")}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`villaDetailsHighlights ${device}`}
      >
        {highlights.map((highlight, index) => (
          <div key={index} className={`villaDetailsHighlightItem ${device}`}>
            <span className={`villaDetailsHighlightIcon ${device}`}>{highlight.icon}</span>
            <span className={`villaDetailsHighlightTitle ${device}`}>
              {highlight.titleKey
                ? t(`villaDetails.highlights.${highlight.titleKey}` as any)
                : highlight.title}
            </span>
            <span className={`villaDetailsHighlightSubtitle ${device}`}>
              {t(`villaDetails.highlights.${highlight.subtitleKey}` as any)}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`villaDetailsDescription ${device}`}
      >
        <h2 className={`villaDetailsSectionTitle ${device}`}>{t("villaDetails.aboutTitle")}</h2>
        <p className={`villaDetailsDescriptionText ${device}`}>{t("villaDetails.description")}</p>
      </motion.div>

      {sections.map((section, sectionIndex) => (
        <motion.div
          key={sectionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + sectionIndex * 0.1 }}
          className={`villaDetailsSection ${device}`}
        >
          <h2 className={`villaDetailsSectionTitle ${device}`}>
            {t(`villaDetails.sections.${section.titleKey}` as any)}
          </h2>
          <div className={`villaDetailsCategoriesGrid ${device}`}>
            {section.items.map((item, itemIndex) => {
              const details = t.raw(`villaDetails.details.${item.detailsKey}` as any) as string[];
              return (
                <div key={itemIndex} className={`villaDetailsCategoryCard ${device}`}>
                  <h3 className={`villaDetailsCategoryTitle ${device}`}>
                    {t(`villaDetails.categories.${item.categoryKey}` as any)}
                  </h3>
                  <ul className={`villaDetailsList ${device}`}>
                    {details.map((detail, detailIndex) => (
                      <li key={detailIndex} className={`villaDetailsListItem ${device}`}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className={`villaDetailsSection villaDetailsRulesSection ${device}`}
      >
        <h2 className={`villaDetailsSectionTitle ${device}`}>{t("villaDetails.houseRules.title")}</h2>
        <div className={`villaDetailsRulesGrid ${device}`}>
          {(t.raw("villaDetails.houseRules.rules") as string[]).map((rule, index) => (
            <div key={index} className={`villaDetailsRuleItem ${device}`}>
              <span className="villaDetailsRuleIcon">&#10003;</span>
              {rule}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className={`villaDetailsCTA ${device}`}
      >
        <h2 className={`villaDetailsCTATitle ${device}`}>{t("villaDetails.cta.title")}</h2>
        <p className={`villaDetailsCTAText ${device}`}>{t("villaDetails.cta.text")}</p>
        <div className={`villaDetailsCTAButtons ${device}`}>
          <Link href="/calendar" className={`villaDetailsCTAButton primary ${device}`}>
            {t("villaDetails.cta.checkAvailability")}
          </Link>
          <Link href="/contact" className={`villaDetailsCTAButton secondary ${device}`}>
            {t("villaDetails.cta.contactUs")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
