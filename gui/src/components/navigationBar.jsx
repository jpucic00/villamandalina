import React from "react";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";

import "../assets/style/navigationBar.css";

import { navigationMenuItems } from "../constants/menuItems";
import MobileMenu from "./mobileMenu";

export default function NavigationBar() {
  const { width } = useWindowDimensions();
  return (
    <div className={`navigationContainer ${deviceCheck(width)}`}>
      {width > 850 ? (
        navigationMenuItems.map((item) => (
          <a
            href={item.link}
            className={`navigationItem ${
              window.location.pathname === item.link ? "active" : null
            } ${deviceCheck(width)}`}
          >
            {item.name}
          </a>
        ))
      ) : (
        <MobileMenu />
      )}
    </div>
  );
}
