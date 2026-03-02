"use client";

import { useTranslations } from "next-intl";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

export default function Footer() {
  const t = useTranslations();
  const { width } = useWindowDimensions();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${deviceCheck(width)}`}>
      <div className={`footer-content ${deviceCheck(width)}`}>
        <p className="footer-copyright">
          © {currentYear} villamandalina.hr — {t("footer.allRightsReserved")}
        </p>
      </div>
    </footer>
  );
}
