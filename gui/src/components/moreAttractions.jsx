import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import Slider from "react-slick";

import { attractions } from "../constants/attractions";

import "../assets/style/moreAttractions.css";
import Krka from "../assets/images/krka.jpg";
import Katedrala from "../assets/images/katedrala.png";

export default function MoreAttractions() {
  const { width } = useWindowDimensions();

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
  };

  const images = [Katedrala, Krka];

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
