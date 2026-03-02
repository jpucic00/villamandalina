"use client";

import { useTranslations } from "next-intl";
import Slider from "react-slick";
import { reviews } from "@/constants/reviews";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

export default function Reviews() {
  const { width } = useWindowDimensions();
  const t = useTranslations();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:
      deviceCheck(width) === "mobile" ? 1 : deviceCheck(width) === "tablet" ? 2 : 3,
    slidesToScroll: 1,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className={`reviewContainer ${deviceCheck(width)}`}>
      <div className={`reviewTitle ${deviceCheck(width)}`}>{t("reviews.title")}</div>
      <div className={`reviewItemsContainer ${deviceCheck(width)}`}>
        <Slider {...settings}>
          {reviews.map((review, i) => (
            <div key={i} className={`reviewItemContainer ${deviceCheck(width)}`}>
              <div className={`reviewItem ${deviceCheck(width)}`}>
                {review.text}
                <div className={`starsContainer ${deviceCheck(width)}`}>
                  {review.stars.map((_, si) => (
                    <div key={si} className={`star ${deviceCheck(width)}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
