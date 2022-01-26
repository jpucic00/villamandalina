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
        <div className={`mobileMenu  ${deviceCheck(width)}`} />
      )}
    </div>
  );
}
