import React from "react";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";

export default function ContactHeadline2() {
  const { width } = useWindowDimensions();
  return (
    <div className={`contactHeadline2Wrapper ${deviceCheck(width)}`}>
      <h1 className={`contactHeadline2Title1 ${deviceCheck(width)}`}>
        We're looking forward to hearing from you!
      </h1>
      <p className={`contactHeadline2Title2 ${deviceCheck(width)}`}>
        Have questions about Villa Mandalina? Send us a message and we'll get back to you as soon as possible.
      </p>
    </div>
  );
}
