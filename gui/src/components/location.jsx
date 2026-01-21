import React from "react";
import { useTranslation } from "react-i18next";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import "../assets/style/location.css";

export default function Location() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  return (
    <div className={`locationContainer ${deviceCheck(width)}`}>
      <div className={`locationTitle ${deviceCheck(width)}`}>
        {t("location.title")}
      </div>
      <div className={`locationContentWrapper ${deviceCheck(width)}`}>
        <iframe
          title="Villa Mandalina"
          className={`locationMaps ${deviceCheck(width)}`}
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          id="gmap_canvas"
          src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%20Obala%20Jerka%20%C5%A0i%C5%BEgori%C4%87a%2013%20%C5%A0ibenik+(Villa%20Mandalina)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
        <a
          href="https://maps.google.com/?q=Obala+Jerka+Šižgorića+13,+22000+Šibenik"
          target="_blank"
          rel="noopener noreferrer"
          className={`locationDescription ${deviceCheck(width)}`}
        >
          Obala Jerka Šižgorića 13, 22000 Šibenik
        </a>
      </div>
      <script
        type="text/javascript"
        src="https://embedmaps.com/google-maps-authorization/script.js?id=cc170026adef1e92856850d3f44c44e4d9e3ee4f"
      ></script>
    </div>
  );
}
