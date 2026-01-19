import { useTranslation } from "react-i18next";
import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import Slider from "react-slick";

import "../assets/style/moreAttractions.css";
import Krka from "../assets/images/krka.jpg";
import Katedrala from "../assets/images/katedrala.png";
import Kornati from "../assets/images/kornati.jpg";
import SvNikola from "../assets/images/svnikola.jpeg";
import Kanal from "../assets/images/kanal.jpg";

export default function MoreAttractions() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const images = [Katedrala, Krka, Kornati, SvNikola, Kanal];
  const attractionKeys = ["cathedral", "krka", "kornati", "stNicholas", "stAnthony"];

  return (
    <div className={`attractionsContainer ${deviceCheck(width)}`}>
      <div className={`attractionsTitle ${deviceCheck(width)}`}>
        {t("attractions.title")}
      </div>
      <div className={`reviewItemsContainer ${deviceCheck(width)}`}>
        <Slider {...settings}>
          {attractionKeys.map((key, index) => {
            return (
              <div key={index} className={`attractionItemContainer ${deviceCheck(width)}`}>
                <div className={`attractionTitle ${deviceCheck(width)}`}>
                  {t(`attractions.items.${key}.title`)}
                </div>
                <img
                  alt=""
                  src={images[index]}
                  className={`attractionImage ${deviceCheck(width)}`}
                ></img>
                <div className={`attractionText ${deviceCheck(width)}`}>
                  {t(`attractions.items.${key}.text`)}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
