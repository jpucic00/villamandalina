import React from "react";

import "../assets/style/landingPage.css";

import HighlightedParts from "../components/highlightedParts";
import Reviews from "../components/reviews";
import Location from "../components/location";
import MoreDetails from "../components/moreDetails";
import MoreAttractions from "../components/moreAttractions";

export default function LandingPage() {
  return (
    <>
      <HighlightedParts />
      <Reviews />
      <Location />
      <MoreAttractions />
      <MoreDetails />
    </>
  );
}
