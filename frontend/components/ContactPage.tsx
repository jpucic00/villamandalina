"use client";

import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import Location from "./Location";
import ContactHeadline from "./ContactHeadline";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

export default function ContactPage() {
  const { width } = useWindowDimensions();
  const device = deviceCheck(width);

  return (
    <div>
      <div className={`contactPageWrapper ${device}`}>
        <div className={`contactLeftColumn ${device}`}>
          <ContactHeadline />
          <ContactForm />
        </div>
        <div className={`contactRightColumn ${device}`}>
          <ContactInfo />
          <Location />
        </div>
      </div>
    </div>
  );
}
