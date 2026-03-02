"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

const categoryKeys = [
  "typeAndSize",
  "distance",
  "exterior",
  "activities",
  "bathrooms",
  "kitchen",
  "bedrooms",
  "livingRoom",
];

export default function MoreDetails() {
  const { width } = useWindowDimensions();
  const t = useTranslations();

  return (
    <div className={`moreDetailsContainer ${deviceCheck(width)}`}>
      <div className={`moreDetailsTitle ${deviceCheck(width)}`}>
        {t("moreDetails.title")} <br />
        {t("moreDetails.villaName")}
      </div>
      <div className={`moreDetailsWrapper ${deviceCheck(width)}`}>
        {categoryKeys.map((categoryKey, index) => {
          const items = t.raw(`moreDetails.categories.${categoryKey}.items` as any) as string[];
          return (
            <div key={index} className={`moreDetailsCategoryWrapper ${deviceCheck(width)}`}>
              <div className={`moreDetailsCategoryTitle ${deviceCheck(width)}`}>
                {t(`moreDetails.categories.${categoryKey}.title` as any)}
              </div>
              {items.map((item, itemIndex) => (
                <div key={itemIndex} className={`moreDetailsItemWrapper ${deviceCheck(width)}`}>
                  •{item}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`moreDetailsButtonWrapper ${deviceCheck(width)}`}
      >
        <Link href="/details" className={`moreDetailsButton ${deviceCheck(width)}`}>
          {t("moreDetails.viewFullDetails")}
        </Link>
      </motion.div>
    </div>
  );
}
