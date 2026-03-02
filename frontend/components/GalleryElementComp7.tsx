"use client";

import { Item } from "react-photoswipe-gallery";
import type { StaticImageData } from "next/image";

interface Props {
  device: string | false;
  title: string;
  image1: StaticImageData;
  image2: StaticImageData;
  image3: StaticImageData;
  image4: StaticImageData;
  image5: StaticImageData;
  image6: StaticImageData;
  image7: StaticImageData;
  sectionLabel: string;
}

const GalleryElementComp7 = ({ device, title, image1, image2, image3, image4, image5, image6, image7, sectionLabel }: Props) => {
  const images = [image1, image2, image3, image4, image5, image6, image7];

  return (
    <div className={`galleryElementWrapper ${device}`}>
      <div className="galleryElementTitleWrapper">
        <h2 className="galleryElementTitle">{title}</h2>
        <div className="galleryElementTitleLine" />
      </div>
      {images.map((img, i) => (
        <Item
          key={i}
          original={img.src}
          thumbnail={img.src}
          width={img.width || 1920}
          height={img.height || 1280}
        >
          {({ ref, open }) => (
            <div ref={ref} onClick={open} className={`gallery7ItemImage_${i + 1}`}>
              <img
                alt={`Villa Mandalina ${sectionLabel} photo ${i + 1}`}
                src={img.src}
                className="galleryItemInnerImage"
                loading="lazy"
              />
            </div>
          )}
        </Item>
      ))}
    </div>
  );
};

export default GalleryElementComp7;
