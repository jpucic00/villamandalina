"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Slider from "react-slick";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

import Krka from "@/assets/images/krka.jpg";
import Katedrala from "@/assets/images/katedrala.png";
import Kornati from "@/assets/images/kornati.jpg";
import SvNikola from "@/assets/images/svnikola.jpeg";
import Kanal from "@/assets/images/kanal.jpg";

const images = [Katedrala, Krka, Kornati, SvNikola, Kanal];
const attractionKeys = ["cathedral", "krka", "kornati", "stNicholas", "stAnthony"];

const altTexts: Record<string, string> = {
  cathedral: "Cathedral of St. James in Šibenik, UNESCO World Heritage Site",
  krka: "Skradinski Buk waterfall in Krka National Park, Croatia",
  kornati: "Kornati National Park archipelago, Adriatic Sea, Croatia",
  stNicholas: "St Nicholas Fortress at the entrance to St Anthony's Channel, Šibenik",
  stAnthony: "St Anthony's Channel, gateway to the Adriatic from Šibenik",
};

export default function MoreAttractions() {
  const { width } = useWindowDimensions();
  const t = useTranslations();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className={`attractionsContainer ${deviceCheck(width)}`}>
      <div className={`attractionsTitle ${deviceCheck(width)}`}>{t("attractions.title")}</div>
      <div className={`reviewItemsContainer ${deviceCheck(width)}`}>
        <Slider {...settings}>
          {attractionKeys.map((key, index) => (
            <div key={index} className={`attractionItemContainer ${deviceCheck(width)}`}>
              <div className={`attractionTitle ${deviceCheck(width)}`}>
                {t(`attractions.items.${key}.title` as any)}
              </div>
              <Image
                src={images[index]}
                alt={altTexts[key]}
                className={`attractionImage ${deviceCheck(width)}`}
                sizes="(max-width: 700px) 100vw, (max-width: 1350px) 80vw, 60vw"
              />
              <div className={`attractionText ${deviceCheck(width)}`}>
                {t(`attractions.items.${key}.text` as any)}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
