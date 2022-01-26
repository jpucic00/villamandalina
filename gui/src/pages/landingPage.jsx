import React from "react";

import "../assets/style/landingPage.css";
import deviceCheck from "../util/deviceCheck";
import Heading from "../components/heading";
import useWindowDimensions from "../util/useWindowDimensions";
import HighlightedParts from "../components/highlightedParts";
import Reviews from "../components/reviews";
import Location from "../components/location";
import MoreDetails from "../components/moreDetails";

export default function LandingPage() {
  const { width } = useWindowDimensions();
  return (
    <div className={`landingPageContainer ${deviceCheck(width)}`}>
      <Heading />
      <div className={`landingPageContentContainer ${deviceCheck(width)}`}>
        <HighlightedParts />
        <Reviews />
        <Location />
        <MoreDetails />
      </div>
      <div className={`blueBackground ${deviceCheck(width)}`} />
      <div className={`moreDetailsBlueBackground ${deviceCheck(width)}`} />
    </div>
  );
}
