import React from "react";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import galleryImages from "../constants/galleryImages";
import GalleryElementComp5 from "../components/GalleryElementComp5";
import GalleryElementComp6 from "../components/GalleryElementComp6";
import GalleryElementComp7 from "../components/GalleryElementComp7";
import "../assets/style/gallery.css";

import { SRLWrapper } from "simple-react-lightbox";

export default function Gallery() {
  const { width } = useWindowDimensions();
  return (
    <>
      <div className={`blueBackgroundSurroundings ${deviceCheck(width)}`} />
      <div className={`blueBackgroundBedrooms ${deviceCheck(width)}`} />
      <SRLWrapper>
        <div className={`galleryContainer ${deviceCheck(width)}`}>
          <GalleryElementComp5
            device={deviceCheck(width)}
            title={"Livingroom"}
            image1={galleryImages.image112}
            image2={galleryImages.image114}
            image3={galleryImages.image108}
            image4={galleryImages.image107}
            image5={galleryImages.image106}
          />

          <GalleryElementComp6
            device={deviceCheck(width)}
            title={"Bedrooms"}
            image1={galleryImages.image100}
            image2={galleryImages.image101}
            image3={galleryImages.image104}
            image4={galleryImages.image146}
            image5={galleryImages.image149}
            image6={galleryImages.image103}
          />
          <GalleryElementComp5
            device={deviceCheck(width)}
            title={"Bathrooms"}
            image1={galleryImages.image145}
            image2={galleryImages.image153}
            image3={galleryImages.image156}
            image4={galleryImages.image157}
            image5={galleryImages.image158}
          />
          <GalleryElementComp7
            device={deviceCheck(width)}
            title={"Surroundings"}
            image1={galleryImages.image125}
            image2={galleryImages.image124}
            image3={galleryImages.image123}
            image4={galleryImages.image126}
            image5={galleryImages.image127}
            image6={galleryImages.image144}
            image7={galleryImages.image138}
          />
        </div>
      </SRLWrapper>
    </>
  );
}
