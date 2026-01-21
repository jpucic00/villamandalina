import React from "react";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";

export default function ContactHeadline1() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  return (
    <div className={`contactHeadline1Wrapper ${deviceCheck(width)}`}>
      <h1 className={`contactHeadline1Title1 ${deviceCheck(width)}`}>
        {t("contactPage.dontHesitate")}
      </h1>
      <h3 className={`contactHeadline1Title2 ${deviceCheck(width)}`}>
        {t("contactPage.contactUs")}
      </h3>
    </div>
  );
}
