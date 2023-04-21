import React from "react";
import ContactForm from "../components/contactForm";
import ContactInfo from "../components/contactInfo";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import ContactHeadline1 from "../components/contactHeadline1";
import ContactHeadline2 from "../components/contactHeadline2";

export default function Contact() {
  const { width } = useWindowDimensions();

  return (
    <div>
      {width > 1350 ? (
        <>
          <div className={`contactPageWrapper ${deviceCheck(width)}`}>
            <ContactForm />
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <ContactInfo />
          </div>
          <ContactHeadline1></ContactHeadline1>
          <ContactHeadline2></ContactHeadline2>
        </>
      ) : (
        <div className={`contactPageWrapper ${deviceCheck(width)}`}>
          <ContactHeadline1></ContactHeadline1>
          <ContactInfo />
          <ContactHeadline2></ContactHeadline2>
          <ContactForm />
        </div>
      )}
    </div>
  );
}
