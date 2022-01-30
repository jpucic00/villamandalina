import React from "react";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import galleryImages from "../constants/galleryImages";
import GalleryNarrowComp from "../components/galleryNarrowComp";
import GalleryWideComp from "../components/galleryWideComp";
import "../assets/style/gallery.css";

import { SRLWrapper } from "simple-react-lightbox";

export default function Gallery() {
  const { width } = useWindowDimensions();
  return (
    <SRLWrapper>
      <div className={`galleryContainer ${deviceCheck(width)}`}>
        <GalleryNarrowComp
          device={deviceCheck(width)}
          image1={galleryImages.image100}
          image2={galleryImages.image141}
        />
        <GalleryWideComp
          device={deviceCheck(width)}
          image1={galleryImages.image102}
          image2={galleryImages.image103}
          image3={galleryImages.image104}
        />
        <GalleryWideComp
          device={deviceCheck(width)}
          image1={galleryImages.image105}
          image2={galleryImages.image115}
          image3={galleryImages.image119}
        />
        <GalleryNarrowComp
          device={deviceCheck(width)}
          image1={galleryImages.image107}
          image2={galleryImages.image108}
        />
      </div>
    </SRLWrapper>
  );
}
