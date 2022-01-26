import React from "react";
import NavigationBar from "./navigationBar";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import Heading from "./heading";

export default function Layout({ children }) {
  const { width } = useWindowDimensions();

  return (
    <div className={`landingPageContainer ${deviceCheck(width)}`}>
      {window.location.pathname === "/" ? (
        <Heading />
      ) : (
        <div className={`NavBarWrapper withOverlay ${deviceCheck(width)}`}>
          <div className={`logo ${deviceCheck(width)}`} />
          <NavigationBar />
        </div>
      )}
      <div className={`landingPageContentContainer ${deviceCheck(width)}`}>
        {children}
      </div>
      {window.location.pathname === "/" ? (
        <>
          <div className={`blueBackground ${deviceCheck(width)}`} />
          <div className={`moreDetailsBlueBackground ${deviceCheck(width)}`} />
        </>
      ) : null}
    </div>
  );
}
