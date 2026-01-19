import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { navigationMenuItems } from "../constants/menuItems";
import { logout } from "../api";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import LanguageSelector from "./LanguageSelector";

export default function MobileMenu() {
  const { width } = useWindowDimensions();
  const { user, loading, clearUser } = useAuth();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const container = useRef();
  const backdrop = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleClickOutside = (event) => {
    if (
      mobileMenuOpen &&
      container.current &&
      !container.current.contains(event.target) &&
      backdrop.current &&
      backdrop.current.contains(event.target)
    ) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const doLogout = () => {
    try {
      logout();
      clearUser();
      handleClose();
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

  const mobileMenuContent = mobileMenuOpen && (
    <>
      <div
        ref={backdrop}
        className={`mobileMenuBackdrop ${isClosing ? 'closing' : ''}`}
      />
      <div
        ref={container}
        className={`mobileMenuWrapper ${isClosing ? 'closing' : 'open'} ${deviceCheck(width)}`}
      >
        <div className={`mobileMenuClose  ${deviceCheck(width)}`}>
          <a href="/" className={`logo ${deviceCheck(width)}`} />
          <div
            onClick={handleClose}
            className={`mobileMenuCloseIcon  ${deviceCheck(width)}`}
          />
        </div>
        <div className={`mobileMenuItemsWrapper ${deviceCheck(width)}`}>
          {navigationMenuItems.map((item) => (
            <a
              key={item.link}
              href={user && item.name === "Log in" ? null : item.link}
              onClick={user && item.name === "Log in" ? doLogout : null}
              className={`mobileMenuItems ${
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
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className={`mobileMenuHeader ${deviceCheck(width)}`}>
        <LanguageSelector className="mobileHeader" />
        {!mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(true)}
            className={`mobileMenu  ${deviceCheck(width)}`}
          />
        )}
      </div>
      {mobileMenuOpen && createPortal(mobileMenuContent, document.body)}
    </>
  );
}
