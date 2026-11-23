"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { Link, usePathname } from "@/navigation";
import { logout } from "@/api";
import { useAuth } from "@/AuthContext";
import { navigationMenuItems } from "@/constants/menuItems";
import LanguageSelector from "./LanguageSelector";
import Wordmark from "./Wordmark";

export default function SiteHeader() {
  const t = useTranslations("nav");
  const tToast = useTranslations("toast");
  const pathname = usePathname();
  const { user, clearUser } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const doLogout = () => {
    logout();
    clearUser();
    setOpen(false);
    toast.success(tToast("loggedOut"));
  };

  const links = navigationMenuItems.map((item) => (
    <Link
      key={item.link}
      href={item.link}
      className="siteNav__link"
      aria-current={pathname === item.link ? "page" : undefined}
    >
      {t(item.key)}
    </Link>
  ));

  return (
    <header className="siteHeader">
      <div className="siteHeader__inner">
        <Link href="/" className="siteHeader__brand" aria-label={t("home")}>
          <Wordmark />
        </Link>
        <nav className="siteNav" aria-label={t("main")}>
          {links}
        </nav>
        <div className="siteHeader__actions">
          {user && (
            <button type="button" className="siteHeader__logout" onClick={doLogout}>
              {t("logout")}
            </button>
          )}
          <LanguageSelector />
          <Link href="/calendar" className="btn btn--ink siteHeader__cta">
            {t("checkAvailability")}
          </Link>
          <button
            type="button"
            className="siteHeader__menuButton"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>
      <div id="mobile-nav" className={`mobileNav ${open ? "is-open" : ""}`} hidden={!open}>
        <nav className="mobileNav__links" aria-label={t("main")}>
          <Link href="/" className="siteNav__link" aria-current={pathname === "/" ? "page" : undefined}>
            {t("home")}
          </Link>
          {links}
        </nav>
        <div className="mobileNav__footer">
          <LanguageSelector />
          {user && (
            <button type="button" className="siteHeader__logout" onClick={doLogout}>
              {t("logout")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
