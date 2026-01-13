import React from "react";
import ContactForm from "../components/contactForm";
import ContactInfo from "../components/contactInfo";
import Location from "../components/location";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import ContactHeadline1 from "../components/contactHeadline1";
import ContactHeadline2 from "../components/contactHeadline2";
import MoreDetails from "../components/moreDetails";

export default function Contact() {
  const { width } = useWindowDimensions();

  return (
    <div>
      {width > 1350 ? (
        <>
          <div className={`contactPageWrapper ${deviceCheck(width)}`}>
            <div className="contactHeadlinesWrapper">
              <ContactHeadline2></ContactHeadline2>
              <ContactForm />
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <ContactInfo />
          </div>
          <div className="contactBottomSection">

            <Location />
          </div>
        </>
      ) : (
        <div className={`contactPageWrapper ${deviceCheck(width)}`}>
          <ContactInfo />
          <ContactHeadline2></ContactHeadline2>
          <ContactForm />
          <Location />
        </div>
      )}
      <MoreDetails />
    </div>
  );
}
