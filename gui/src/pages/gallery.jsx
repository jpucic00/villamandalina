import React from "react";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import galleryImages from "../constants/galleryImages";
import GalleryElementComp from "../components/galleryElementComp";
import "../assets/style/gallery.css";

import { SRLWrapper } from "simple-react-lightbox";

export default function Gallery() {
  const { width } = useWindowDimensions();
  return (
    <React.Fragment>
      <div
        className={`blueBackgroundPLACEHOLDER_WARNING ${deviceCheck(width)}`}
      />
      <SRLWrapper>
        <div className={`galleryContainer ${deviceCheck(width)}`}>
          <GalleryElementComp
            device={deviceCheck(width)}
            title={"Livingroom"}
            image1={galleryImages.image112}
            image2={galleryImages.image114}
            image3={galleryImages.image108}
            image4={galleryImages.image107}
            image5={galleryImages.image106}
          />

          <GalleryElementComp
            device={deviceCheck(width)}
            title={"Bedrooms"}
            image1={galleryImages.image100}
            image2={galleryImages.image101}
            image3={galleryImages.image104}
            image4={galleryImages.image146}
            image5={galleryImages.image149}
          />
        </div>
      </SRLWrapper>
    </React.Fragment>
  );
}
