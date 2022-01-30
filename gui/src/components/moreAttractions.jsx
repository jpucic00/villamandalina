import useWindowDimensions from "../util/useWindowDimensions";
import deviceCheck from "../util/deviceCheck";
import Slider from "react-slick";

import { attractions } from "../constants/attractions";

import "../assets/style/moreAttractions.css";

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

  return (
    <div className={`attractionsContainer ${deviceCheck(width)}`}>
      <div className={`attractionsTitle ${deviceCheck(width)}`}>
        Nearby Attractions
      </div>
      <div className={`reviewItemsContainer ${deviceCheck(width)}`}>
        <Slider {...settings}>
          {attractions.map((attraction) => {
            return (
              <div className={`attractionItemContainer ${deviceCheck(width)}`}>
                <div className={`attractionTitle ${deviceCheck(width)}`}>
                  {attraction.title}
                </div>
                <img
                  height={500}
                  width={500}
                  src={attraction.image}
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
