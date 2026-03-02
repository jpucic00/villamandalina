"use client";

import { useTranslations } from "next-intl";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

export default function Location() {
  const { width } = useWindowDimensions();
  const t = useTranslations();

  return (
    <div className={`locationContainer ${deviceCheck(width)}`}>
      <div className={`locationTitle ${deviceCheck(width)}`}>{t("location.title")}</div>
      <div className={`locationContentWrapper ${deviceCheck(width)}`}>
        <iframe
          title="Villa Mandalina location in Šibenik, Croatia"
          className={`locationMaps ${deviceCheck(width)}`}
          scrolling="no"
          id="gmap_canvas"
          src="https://maps.google.com/maps?width=520&height=400&hl=en&q=%20Obala%20Jerka%20%C5%A0i%C5%BEgori%C4%87a%2013%20%C5%A0ibenik+(Villa%20Mandalina)&t=&z=13&ie=UTF8&iwloc=B&output=embed"
          style={{ border: 0 }}
        />
        <a
          href="https://maps.google.com/?q=Obala+Jerka+Šižgorića+13,+22000+Šibenik"
          target="_blank"
          rel="noopener noreferrer"
          className={`locationDescription ${deviceCheck(width)}`}
        >
          Obala Jerka Šižgorića 13, 22000 Šibenik
        </a>
      </div>
    </div>
  );
}
