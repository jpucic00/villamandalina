import React from "react";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";

import "../assets/style/navigationBar.css";

import { navigationMenuItems } from "../constants/menuItems";

export default function NavigationBar() {
  const { width } = useWindowDimensions();
  return (
    <div className={`navigationContainer ${deviceCheck(width)}`}>
      {width > 1500 ? (
        navigationMenuItems.map((item) => (
          <div className={`navigationItem ${item.name} ${deviceCheck(width)}`}>
            {item.name}
          </div>
        ))
      ) : (
        <div className={`mobileMenu  ${deviceCheck(width)}`} />
      )}
    </div>
  );
}
