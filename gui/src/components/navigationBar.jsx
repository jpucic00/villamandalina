import React from "react";
import { useTranslation } from "react-i18next";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";

import "../assets/style/navigationBar.css";

import { navigationMenuItems } from "../constants/menuItems";
import MobileMenu from "./mobileMenu";
import LanguageSelector from "./LanguageSelector";

import { logout } from "../api";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";

export default function NavigationBar() {
  const { user, loading, clearUser } = useAuth();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  const doLogout = () => {
    try {
      logout();
      clearUser();
      toast.success(t("toast.loggedOut"));
    } catch {
      toast.error(t("toast.failedLogout"));
    }
  };

  const getTranslatedName = (item) => {
    const keyMap = {
      "Home": "nav.home",
      "Details": "nav.details",
      "Gallery": "nav.gallery",
      "Calendar": "nav.calendar",
      "Contact": "nav.contact",
      "Log in": "nav.login"
    };
    return t(keyMap[item.name] || item.name);
  };

  return (
    <div className={`navigationContainer ${deviceCheck(width)}`}>
      {width > 1024 ? (
        <>
          <LanguageSelector />
          {navigationMenuItems.map((item) => (
            <a
              key={item.link}
              href={user && item.name === "Log in" ? null : item.link}
              onClick={user && item.name === "Log in" ? doLogout : null}
              className={`navigationItem ${
                window.location.pathname === item.link ? "active" : null
              } ${deviceCheck(width)}`}
            >
              {item.name === "Log in"
                ? user && !loading
                  ? t("nav.logout")
                  : !loading && getTranslatedName(item)
                : getTranslatedName(item)}
            </a>
          ))}
        </>
      ) : (
        <MobileMenu />
      )}
    </div>
  );
}
