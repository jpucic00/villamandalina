"use client";

import { useTranslations } from "next-intl";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

export default function ContactHeadline() {
  const { width } = useWindowDimensions();
  const t = useTranslations();

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
