import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
        {moreDetails.map((detail, index) => {
          return (
            <div key={index} className={`moreDetailsCategoryWrapper ${deviceCheck(width)}`}>
              <div className={`moreDetailsCategoryTitle ${deviceCheck(width)}`}>
                {detail.title}
              </div>
              {detail.details.map((item, itemIndex) => {
                return (
                  <div
                    key={itemIndex}
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
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`moreDetailsButtonWrapper ${deviceCheck(width)}`}
      >
        <Link to="/details" className={`moreDetailsButton ${deviceCheck(width)}`}>
          View Full Details
        </Link>
      </motion.div>
    </div>
  );
}
