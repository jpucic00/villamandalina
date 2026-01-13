import React from "react";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";

import "../assets/style/navigationBar.css";

import { navigationMenuItems } from "../constants/menuItems";
import MobileMenu from "./mobileMenu";

import { logout } from "../api";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";

export default function NavigationBar() {
  const { user, loading, clearUser } = useAuth();
  const { width } = useWindowDimensions();

  const doLogout = () => {
    try {
      logout();
      clearUser();
      toast.success("Logged out");
    } catch {
      toast.error("Failed to logout");
    }
  };
  return (
    <div className={`navigationContainer ${deviceCheck(width)}`}>
      {width > 1024 ? (
        navigationMenuItems.map((item) => (
          <a
            href={user && item.name === "Log in" ? null : item.link}
            onClick={user && item.name === "Log in" ? doLogout : null}
            className={`navigationItem ${
              window.location.pathname === item.link ? "active" : null
            } ${deviceCheck(width)}`}
          >
            {item.name === "Log in"
              ? user && !loading
                ? "Log out"
                : !loading && item.name
              : item.name}
          </a>
        ))
      ) : (
        <MobileMenu />
      )}
    </div>
  );
}
