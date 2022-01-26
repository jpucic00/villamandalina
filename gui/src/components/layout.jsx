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
        <div className={`NavBarWrapper ${deviceCheck(width)}`}>
          <div className={`logo ${deviceCheck(width)}`} />
          <NavigationBar />
        </div>
      )}
      {children}
    </div>
  );
}
