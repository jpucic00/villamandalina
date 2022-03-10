import React from "react";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";

import "../assets/style/navigationBar.css";

import { navigationMenuItems } from "../constants/menuItems";
import MobileMenu from "./mobileMenu";

import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NavigationBar() {
  const [user, loading, error] = useAuthState(auth);
  const { width } = useWindowDimensions();
  return (
    <div className={`navigationContainer ${deviceCheck(width)}`}>
      {width > 850 ? (
        navigationMenuItems.map((item) => (
          <a
            href={user && item.name === "Log in" ? null : item.link}
            onClick={user && item.name === "Log in" ? logout : null}
            className={`navigationItem ${
              window.location.pathname === item.link ? "active" : null
            } ${deviceCheck(width)}`}
          >
            {user && item.name === "Log in" ? "Log out" : item.name}
          </a>
        ))
      ) : (
        <MobileMenu />
      )}
    </div>
  );
}
