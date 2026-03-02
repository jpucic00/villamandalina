"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import NavigationBar from "./NavigationBar";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

const MotionLink = motion(Link);

export default function Heading() {
  const { width } = useWindowDimensions();
  const t = useTranslations();

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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`headerTitle ${deviceCheck(width)}`}
          >
            {t("header.title")}
          </motion.h1>
          <div className={`headerButtonContainer ${deviceCheck(width)}`}>
            <MotionLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/calendar" className={`reservationButtonHeader ${deviceCheck(width)}`}>
              {t("header.makeReservation")}
            </MotionLink>
            <MotionLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/contact" className={`contactButtonHeader ${deviceCheck(width)}`}>
              {t("header.contactUs")}
            </MotionLink>
          </div>
        </div>
      </div>
      <Link href="/" className={`headingLogo ${deviceCheck(width)}`} aria-label="Villa Mandalina home" />
      <div className={`headingNavBarWrapper ${deviceCheck(width)}`}>
        <NavigationBar />
      </div>
      <div
        className={`scrollIndicator ${deviceCheck(width)}`}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span>{t("header.scroll")}</span>
      </div>
    </div>
  );
}
