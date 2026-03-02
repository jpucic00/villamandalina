"use client";

import { useTranslations } from "next-intl";
import { Gallery as PhotoGallery } from "react-photoswipe-gallery";
import galleryImages from "@/constants/galleryImages";
import GalleryElementComp5 from "./GalleryElementComp5";
import GalleryElementComp6 from "./GalleryElementComp6";
import GalleryElementComp7 from "./GalleryElementComp7";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

export default function GalleryPage() {
  const { width } = useWindowDimensions();
  const t = useTranslations();

  return (
    <>
      <div className={`blueBackgroundSurroundings ${deviceCheck(width)}`} />
      <div className={`blueBackgroundBedrooms ${deviceCheck(width)}`} />
      <PhotoGallery>
        <div className={`galleryContainer ${deviceCheck(width)}`}>
          <GalleryElementComp5
            device={deviceCheck(width)}
            title={t("gallery.livingroom")}
            image1={galleryImages.image112}
            image2={galleryImages.image114}
            image3={galleryImages.image108}
            image4={galleryImages.image107}
            image5={galleryImages.image106}
            sectionLabel="living room"
          />
          <GalleryElementComp6
            device={deviceCheck(width)}
            title={t("gallery.bedrooms")}
            image1={galleryImages.image100}
            image2={galleryImages.image101}
            image3={galleryImages.image104}
            image4={galleryImages.image146}
            image5={galleryImages.image149}
            image6={galleryImages.image103}
            sectionLabel="bedroom"
          />
          <GalleryElementComp5
            device={deviceCheck(width)}
            title={t("gallery.bathrooms")}
            image1={galleryImages.image145}
            image2={galleryImages.image153}
            image3={galleryImages.image156}
            image4={galleryImages.image157}
            image5={galleryImages.image158}
            sectionLabel="bathroom"
          />
          <GalleryElementComp7
            device={deviceCheck(width)}
            title={t("gallery.surroundings")}
            image1={galleryImages.image125}
            image2={galleryImages.image124}
            image3={galleryImages.image123}
            image4={galleryImages.image126}
            image5={galleryImages.image127}
            image6={galleryImages.image144}
            image7={galleryImages.image138}
            sectionLabel="surroundings"
          />
        </div>
      </PhotoGallery>
    </>
  );
}
