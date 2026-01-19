import React from "react";
import { useTranslation } from "react-i18next";
import deviceCheck from "../util/deviceCheck";

import "../assets/style/heading.css";
import NavigationBar from "./navigationBar";
import useWindowDimensions from "../util/useWindowDimensions";
import { motion } from "framer-motion";

export default function Heading() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  return (
    <div className={`wrap-layer ${deviceCheck(width)}`}>
      <div className={`rightSection ${deviceCheck(width)}`}>
        <div className={`overlay ${deviceCheck(width)}`} />
      </div>
      <div className={`leftSection ${deviceCheck(width)}`}>
        <div className="decorativeCircles">
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
          <div className="circle circle4"></div>
          <div className="circle circle5"></div>
          <div className="circle circle6"></div>
        </div>
        <div className={`contentWrapper ${deviceCheck(width)}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`headerTitle ${deviceCheck(width)}`}
          >
            {t("header.title")}
          </motion.div>
          <div className={`headerButtonContainer ${deviceCheck(width)}`}>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={"/calendar"}
              className={`reservationButtonHeader ${deviceCheck(width)}`}
            >
              {t("header.makeReservation")}
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={"/contact"}
              className={`contactButtonHeader ${deviceCheck(width)}`}
            >
              {t("header.contactUs")}
            </motion.a>
          </div>
        </div>
      </div>
      <a href="/" className={`headingLogo ${deviceCheck(width)}`} />
      <div className={`headingNavBarWrapper ${deviceCheck(width)}`}>
        <NavigationBar />
      </div>
      <div
        className={`scrollIndicator ${deviceCheck(width)}`}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span>{t("header.scroll")}</span>
      </div>
    </div>
  );
}
