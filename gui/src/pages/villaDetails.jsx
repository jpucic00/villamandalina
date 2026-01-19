import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { motion } from "framer-motion";
import "../assets/style/villaDetails.css";

export default function VillaDetails() {
  const { width } = useWindowDimensions();
  const device = deviceCheck(width);
  const { t } = useTranslation();

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

  return (
    <div className={`villaDetailsPage ${device}`}>
      {/* Page Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`villaDetailsIntro ${device}`}
      >
        <p className={`villaDetailsIntroText ${device}`}>
          {t("villaDetails.introText")}
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`villaDetailsHighlights ${device}`}
      >
        {highlights.map((highlight, index) => (
          <div key={index} className={`villaDetailsHighlightItem ${device}`}>
            <span className={`villaDetailsHighlightIcon ${device}`}>
              {highlight.icon}
            </span>
            <span className={`villaDetailsHighlightTitle ${device}`}>
              {highlight.titleKey ? t(`villaDetails.highlights.${highlight.titleKey}`) : highlight.title}
            </span>
            <span className={`villaDetailsHighlightSubtitle ${device}`}>
              {t(`villaDetails.highlights.${highlight.subtitleKey}`)}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`villaDetailsDescription ${device}`}
      >
        <h2 className={`villaDetailsSectionTitle ${device}`}>{t("villaDetails.aboutTitle")}</h2>
        <p className={`villaDetailsDescriptionText ${device}`}>
          {t("villaDetails.description")}
        </p>
      </motion.div>

      {/* Detailed Sections */}
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={sectionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + sectionIndex * 0.1 }}
          className={`villaDetailsSection ${device}`}
        >
          <h2 className={`villaDetailsSectionTitle ${device}`}>
            {t(`villaDetails.sections.${section.titleKey}`)}
          </h2>
          <div className={`villaDetailsCategoriesGrid ${device}`}>
            {section.items.map((item, itemIndex) => {
              const details = t(`villaDetails.details.${item.detailsKey}`, { returnObjects: true });
              return (
                <div
                  key={itemIndex}
                  className={`villaDetailsCategoryCard ${device}`}
                >
                  <h3 className={`villaDetailsCategoryTitle ${device}`}>
                    {t(`villaDetails.categories.${item.categoryKey}`)}
                  </h3>
                  <ul className={`villaDetailsList ${device}`}>
                    {details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className={`villaDetailsListItem ${device}`}
                      >
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

      {/* House Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className={`villaDetailsSection villaDetailsRulesSection ${device}`}
      >
        <h2 className={`villaDetailsSectionTitle ${device}`}>{t("villaDetails.houseRules.title")}</h2>
        <div className={`villaDetailsRulesGrid ${device}`}>
          {t("villaDetails.houseRules.rules", { returnObjects: true }).map((rule, index) => (
            <div key={index} className={`villaDetailsRuleItem ${device}`}>
              <span className="villaDetailsRuleIcon">&#10003;</span>
              {rule}
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className={`villaDetailsCTA ${device}`}
      >
        <h2 className={`villaDetailsCTATitle ${device}`}>
          {t("villaDetails.cta.title")}
        </h2>
        <p className={`villaDetailsCTAText ${device}`}>
          {t("villaDetails.cta.text")}
        </p>
        <div className={`villaDetailsCTAButtons ${device}`}>
          <Link to="/calendar" className={`villaDetailsCTAButton primary ${device}`}>
            {t("villaDetails.cta.checkAvailability")}
          </Link>
          <Link to="/contact" className={`villaDetailsCTAButton secondary ${device}`}>
            {t("villaDetails.cta.contactUs")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
