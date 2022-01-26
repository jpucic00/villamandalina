import React from "react";
import deviceCheck from "../util/deviceCheck";

import "../assets/style/heading.css";
import NavigationBar from "./navigationBar";
import useWindowDimensions from "../util/useWindowDimensions";

export default function Heading() {
  const { width } = useWindowDimensions();
  return (
    <div className={`wrap-layer ${deviceCheck(width)}`}>
      <div className={`overlay ${deviceCheck(width)}`} />
      <div className={`NavBarWrapper ${deviceCheck(width)}`}>
        <div className={`logo ${deviceCheck(width)}`} />
        <NavigationBar />
      </div>
      <div className={`headerTitle ${deviceCheck(width)}`}>
        Luxury Villa Just Outside The City Center With A Beautifull Panoramic
        View
      </div>
      <div className={`headerButtonContainer ${deviceCheck(width)}`}>
        <button className={`reservationButtonHeader ${deviceCheck(width)}`}>
          Make a reservation
        </button>
        <button className={`contactButtonHeader ${deviceCheck(width)}`}>
          Contact us
        </button>
      </div>
    </div>
  );
}
