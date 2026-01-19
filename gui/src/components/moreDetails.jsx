import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import "../assets/style/moreDetails.css";

export default function MoreDetails() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  const categoryKeys = [
    "typeAndSize",
    "distance",
    "exterior",
    "activities",
    "bathrooms",
    "kitchen",
    "bedrooms",
    "livingRoom"
  ];

  return (
    <div className={`moreDetailsContainer ${deviceCheck(width)}`}>
      <div className={`moreDetailsTitle ${deviceCheck(width)}`}>
        {t("moreDetails.title")} <br />
        {t("moreDetails.villaName")}
      </div>
      <div className={`moreDetailsWrapper ${deviceCheck(width)}`}>
        {categoryKeys.map((categoryKey, index) => {
          const items = t(`moreDetails.categories.${categoryKey}.items`, { returnObjects: true });
          return (
            <div key={index} className={`moreDetailsCategoryWrapper ${deviceCheck(width)}`}>
              <div className={`moreDetailsCategoryTitle ${deviceCheck(width)}`}>
                {t(`moreDetails.categories.${categoryKey}.title`)}
              </div>
              {items.map((item, itemIndex) => {
                return (
                  <div
                    key={itemIndex}
                    className={`moreDetailsItemWrapper ${deviceCheck(width)}`}
                  >
                    •{item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`moreDetailsButtonWrapper ${deviceCheck(width)}`}
      >
        <Link to="/details" className={`moreDetailsButton ${deviceCheck(width)}`}>
          {t("moreDetails.viewFullDetails")}
        </Link>
      </motion.div>
    </div>
  );
}
