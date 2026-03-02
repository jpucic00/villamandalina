"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { navigationMenuItems } from "@/constants/menuItems";
import { logout } from "@/api";
import { useAuth } from "@/AuthContext";
import { toast } from "react-toastify";
import LanguageSelector from "./LanguageSelector";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

const keyMap: Record<string, string> = {
  Home: "nav.home",
  Details: "nav.details",
  Gallery: "nav.gallery",
  Calendar: "nav.calendar",
  Contact: "nav.contact",
  "Log in": "nav.login",
};

export default function MobileMenu() {
  const { width } = useWindowDimensions();
  const { user, loading, clearUser } = useAuth();
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        container.current &&
        !container.current.contains(event.target as Node) &&
        backdrop.current &&
        backdrop.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const mobileMenuContent = mobileMenuOpen && (
    <>
      <div ref={backdrop} className={`mobileMenuBackdrop ${isClosing ? "closing" : ""}`} />
      <div
        ref={container}
        className={`mobileMenuWrapper ${isClosing ? "closing" : "open"} ${deviceCheck(width)}`}
      >
        <div className={`mobileMenuClose ${deviceCheck(width)}`}>
          <Link href="/" className={`logo ${deviceCheck(width)}`} aria-label="Villa Mandalina home" />
          <div onClick={handleClose} className={`mobileMenuCloseIcon ${deviceCheck(width)}`} />
        </div>
        <div className={`mobileMenuItemsWrapper ${deviceCheck(width)}`}>
          {navigationMenuItems.map((item) => {
            const isLogIn = item.name === "Log in";
            const label = isLogIn
              ? user && !loading
                ? t("nav.logout")
                : !loading
                ? t(keyMap[item.name])
                : null
              : t(keyMap[item.name]);
            const isActive = pathname === item.link;

            if (isLogIn && user) {
              return (
                <button
                  key={item.link}
                  onClick={doLogout}
                  className={`mobileMenuItems ${deviceCheck(width)}`}
                  style={{ background: "none", border: "none", cursor: "pointer", width: "100%" }}
                >
                  {label}
                </button>
              );
            }

            return (
              <Link
                key={item.link}
                href={item.link}
                className={`mobileMenuItems ${isActive ? "active" : ""} ${deviceCheck(width)}`}
                onClick={handleClose}
              >
                {label}
              </Link>
            );
          })}
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
            className={`mobileMenu ${deviceCheck(width)}`}
          />
        )}
      </div>
      {mounted && mobileMenuOpen && createPortal(mobileMenuContent, document.body)}
    </>
  );
}
