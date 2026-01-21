import React from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "./navigationBar";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import Heading from "./heading";
import Footer from "./Footer";

export default function Layout({ children }) {
  const { width } = useWindowDimensions();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={`landingPageContainer ${deviceCheck(width)}`}>
      {isHomePage ? (
        <Heading />
      ) : (
        <div className={`NavBarOuter ${deviceCheck(width)}`}>
          <div className={`withOverlay ${deviceCheck(width)}`} />
          <div className={`NavBarWrapper ${deviceCheck(width)}`}>
            <a href="/" className={`logo ${deviceCheck(width)}`} />
            <NavigationBar />
          </div>
        </div>
      )}
      <div
        className={`${
          isHomePage
            ? "landingPageContentContainer"
            : "PageContentContainer"
        } ${deviceCheck(width)}`}
      >
        {children}
      </div>
      {isHomePage ? (
        <>
          <div className={`blueBackground ${deviceCheck(width)}`} />
          <div className={`moreDetailsBlueBackground ${deviceCheck(width)}`} />
        </>
      ) : null}
      <Footer />
    </div>
  );
}
