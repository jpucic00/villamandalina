import React from "react";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import "../assets/style/footer.css";

export default function Footer() {
  const { t } = useTranslation();
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
