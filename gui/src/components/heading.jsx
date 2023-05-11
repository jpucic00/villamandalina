import React from "react";
import deviceCheck from "../util/deviceCheck";

import "../assets/style/heading.css";
import NavigationBar from "./navigationBar";
import useWindowDimensions from "../util/useWindowDimensions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { motion } from "framer-motion";

export default function Heading() {
  const { width } = useWindowDimensions();
  const history = useHistory();
  return (
    <div className={`wrap-layer ${deviceCheck(width)}`}>
      <div className={`overlay ${deviceCheck(width)}`} />
      <div className={`NavBarWrapper ${deviceCheck(width)}`}>
        <div className={`logo ${deviceCheck(width)}`} />
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
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          onClick={() => history.push("/calendar")}
          className={`reservationButtonHeader ${deviceCheck(width)}`}
        >
          Make a reservation
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          onClick={() => history.push("/contact")}
          className={`contactButtonHeader ${deviceCheck(width)}`}
        >
          Contact us
        </motion.button>
      </div>
    </div>
  );
}
