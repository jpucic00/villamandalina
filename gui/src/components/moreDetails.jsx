import React from "react";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { moreDetails } from "../constants/moreDetails";
import "../assets/style/moreDetails.css";

export default function MoreDetails() {
  const { width } = useWindowDimensions();

  return (
    <div className={`moreDetailsContainer ${deviceCheck(width)}`}>
      <div className={`moreDetailsTitle ${deviceCheck(width)}`}>
        More details about <br />
        Villa Mandalina
      </div>
      <div className={`moreDetailsWrapper ${deviceCheck(width)}`}>
        {moreDetails.map((detail) => {
          return (
            <div className={`moreDetailsCategoryWrapper ${deviceCheck(width)}`}>
              <div className={`moreDetailsCategoryTitle ${deviceCheck(width)}`}>
                {detail.title}
              </div>
              {detail.details.map((item) => {
                return (
                  <div
                    className={`moreDetailsItemWrapper ${deviceCheck(width)}`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
