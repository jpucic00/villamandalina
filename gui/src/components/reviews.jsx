import React from "react";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import "../assets/style/reviews.css";
import Slider from "react-slick";
import { reviews } from "../constants/reviews";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Reviews() {
  const { width } = useWindowDimensions();
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow:
      deviceCheck(width) === "mobile"
        ? 1
        : deviceCheck(width) === "tablet"
        ? 2
        : 3,
    slidesToScroll: 1,
    rows: 1,
  };
  return (
    <div className={`reviewContainer ${deviceCheck(width)}`}>
      <div className={`reviewTitle ${deviceCheck(width)}`}>
        We are honoured to share the testimonials we recived from our
        exceptional guests
      </div>
      <div className={`reviewItemsContainer ${deviceCheck(width)}`}>
        <Slider {...settings}>
          {reviews.map((review) => {
            return (
              <div className={`reviewItemContainer ${deviceCheck(width)}`}>
                <div className={`reviewItem ${deviceCheck(width)}`}>
                  {review.text}
                  <div className={`starsContainer ${deviceCheck(width)}`}>
                    {review.stars.map(() => {
                      return <div className={`star ${deviceCheck(width)}`} />;
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
