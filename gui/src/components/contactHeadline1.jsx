import React from "react";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";

export default function ContactHeadline1() {
  const { width } = useWindowDimensions();
  return (
    <div className={`contactHeadline1Wrapper ${deviceCheck(width)}`}>
      <h1 className={`contactHeadline1Title1 ${deviceCheck(width)}`}>
        Dont Hesitate To
      </h1>
      <h3 className={`contactHeadline1Title2 ${deviceCheck(width)}`}>
        CONTACT US
      </h3>
    </div>
  );
}
