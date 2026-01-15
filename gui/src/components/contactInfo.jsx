import React from "react";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";

export default function ContactInfo() {
  const { width } = useWindowDimensions();

  return (
    <div className={`contactInfoWrapper ${deviceCheck(width)}`}>
      <h3 className={`contactInfoTitle ${deviceCheck(width)}`}>CALL US</h3>
      <p className={`contactInfoText ${deviceCheck(width)}`}>
        +385 95 333 555
        <br />
        +385 95 444 777
      </p>
      <h3 className={`contactInfoTitle ${deviceCheck(width)}`}>LOCATION</h3>
      <p className={`contactInfoText ${deviceCheck(width)}`}>
        Obala Jerka Šižgorića 13, 22000 Šibenik, Hrvatska
      </p>
      <h3 className={`contactInfoTitle ${deviceCheck(width)}`}>
        CHECK IN / CHECK OUT
      </h3>
      <p className={`contactInfoText ${deviceCheck(width)}`}>
        Check In: from 16:00
        <br />
        Check Out: until 10:00
      </p>
    </div>
  );
}
