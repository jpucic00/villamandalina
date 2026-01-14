import React from "react";
import ContactForm from "../components/contactForm";
import ContactInfo from "../components/contactInfo";
import Location from "../components/location";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import ContactHeadline2 from "../components/contactHeadline2";

export default function Contact() {
  const { width } = useWindowDimensions();
  const device = deviceCheck(width);

  return (
    <div>
      <div className={`contactPageWrapper ${device}`}>
        {/* Left column: Text + Form */}
        <div className={`contactLeftColumn ${device}`}>
          <ContactHeadline2 />
          <ContactForm />
        </div>
        {/* Right column: Contact Info + Location */}
        <div className={`contactRightColumn ${device}`}>
          <ContactInfo />
          <Location />
        </div>
      </div>
    </div>
  );
}
