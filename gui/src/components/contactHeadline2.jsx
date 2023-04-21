import React from "react";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";

export default function ContactHeadline2() {
  const { width } = useWindowDimensions();
  return (
    <div className={`contactHeadline2Wrapper ${deviceCheck(width)}`}>
      <h1 className={`contactHeadline2Title1 ${deviceCheck(width)}`}>
        Hey! We are looking foward to your message.
      </h1>
      <p className={`contactHeadline2Title2 ${deviceCheck(width)}`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo
        maecenas lectus sed et.
      </p>
    </div>
  );
}
