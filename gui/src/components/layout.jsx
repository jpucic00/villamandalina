import React from "react";
import NavigationBar from "./navigationBar";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import Heading from "./heading";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Layout({ children }) {
  const { width } = useWindowDimensions();
  const [user, loading, error] = useAuthState(auth); //eslint-disable-line

  return (
    <div className={`landingPageContainer ${deviceCheck(width)}`}>
      {window.location.pathname === "/" ? (
        <Heading />
      ) : (
        <div className={`NavBarWrapper  ${deviceCheck(width)}`}>
          <div className={`blueBackgroundHeading ${deviceCheck(width)}`} />
          <div className={`withOverlay ${deviceCheck(width)}`} />
          <a href="/" className={`logo ${deviceCheck(width)}`} />
          <NavigationBar />
        </div>
      )}
      <div
        className={`${
          window.location.pathname === "/"
            ? "landingPageContentContainer"
            : "PageContentContainer"
        } ${deviceCheck(width)}`}
      >
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
