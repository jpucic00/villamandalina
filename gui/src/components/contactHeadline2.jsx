import React from "react";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";

export default function ContactHeadline2() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  return (
    <div className={`contactHeadline2Wrapper ${deviceCheck(width)}`}>
      <h1 className={`contactHeadline2Title1 ${deviceCheck(width)}`}>
        {t("contact.headline")}
      </h1>
      <p className={`contactHeadline2Title2 ${deviceCheck(width)}`}>
        {t("contact.subheadline")}
      </p>
    </div>
  );
}
