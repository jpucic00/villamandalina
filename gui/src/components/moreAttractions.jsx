import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import Slider from "react-slick";

import { attractions } from "../constants/attractions";

import "../assets/style/moreAttractions.css";
import Krka from "../assets/images/krka.jpg";
import Katedrala from "../assets/images/katedrala.png";
import Kornati from "../assets/images/kornati.jpg";
import SvNikola from "../assets/images/svnikola.jpeg";
import Kanal from "../assets/images/kanal.jpg";

export default function MoreAttractions() {
  const { width } = useWindowDimensions();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [Katedrala, Krka, Kornati, SvNikola, Kanal];

  return (
    <div className={`attractionsContainer ${deviceCheck(width)}`}>
      <div className={`attractionsTitle ${deviceCheck(width)}`}>
        Nearby Attractions
      </div>
      <div className={`reviewItemsContainer ${deviceCheck(width)}`}>
        <Slider {...settings}>
          {attractions.map((attraction, index) => {
            return (
              <div className={`attractionItemContainer ${deviceCheck(width)}`}>
                <div className={`attractionTitle ${deviceCheck(width)}`}>
                  {attraction.title}
                </div>
                <img
                  alt=""
                  src={images[index]}
                  className={`attractionImage ${deviceCheck(width)}`}
                ></img>
                <div className={`attractionText ${deviceCheck(width)}`}>
                  {attraction.text}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
