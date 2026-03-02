"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { navigationMenuItems } from "@/constants/menuItems";
import MobileMenu from "./MobileMenu";
import LanguageSelector from "./LanguageSelector";
import { logout } from "@/api";
import { useAuth } from "@/AuthContext";
import { toast } from "react-toastify";
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

export default function NavigationBar() {
  const { user, loading, clearUser } = useAuth();
  const { width } = useWindowDimensions();
  const t = useTranslations();
  const pathname = usePathname();

  const doLogout = () => {
    try {
      logout();
      clearUser();
      toast.success(t("toast.loggedOut"));
    } catch {
      toast.error(t("toast.failedLogout"));
    }
  };

  return (
    <div className={`navigationContainer ${deviceCheck(width)}`}>
      {width > 1024 ? (
        <>
          <LanguageSelector />
          {navigationMenuItems.map((item) => {
            const isActive = pathname === item.link;
            const isLogIn = item.name === "Log in";
            const label = isLogIn
              ? user && !loading
                ? t("nav.logout")
                : !loading
                ? t(keyMap[item.name])
                : null
              : t(keyMap[item.name]);

            if (isLogIn && user) {
              return (
                <button
                  key={item.link}
                  onClick={doLogout}
                  className={`navigationItem ${deviceCheck(width)}`}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  {label}
                </button>
              );
            }

            return (
              <Link
                key={item.link}
                href={item.link}
                className={`navigationItem ${isActive ? "active" : ""} ${deviceCheck(width)}`}
              >
                {label}
              </Link>
            );
          })}
        </>
      ) : (
        <MobileMenu />
      )}
    </div>
  );
}
