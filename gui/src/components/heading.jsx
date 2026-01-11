import React from "react";
import deviceCheck from "../util/deviceCheck";

import "../assets/style/heading.css";
import NavigationBar from "./navigationBar";
import useWindowDimensions from "../util/useWindowDimensions";
import { motion } from "framer-motion";

export default function Heading() {
  const { width } = useWindowDimensions();
  return (
    <div className={`wrap-layer ${deviceCheck(width)}`}>
      <div className={`overlay ${deviceCheck(width)}`} />
      <div className={`NavBarWrapper ${deviceCheck(width)}`}>
        <a href="/" className={`logo ${deviceCheck(width)}`} />
        <NavigationBar />
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "easeIn" }}
        className={`headerTitle ${deviceCheck(width)}`}
      >
        Luxury Villa Just Outside The City Center With A Beautifull Panoramic
        View
      </motion.div>
      <div className={`headerButtonContainer ${deviceCheck(width)}`}>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          href={"/calendar"}
          className={`reservationButtonHeader ${deviceCheck(width)}`}
        >
          Make a reservation
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          href={"/contact"}
          className={`contactButtonHeader ${deviceCheck(width)}`}
        >
          Contact us
        </motion.a>
      </div>
    </div>
  );
}
