import React from "react";
import { listOfHighlights } from "../constants/listOfHighlights";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import "../assets/style/highlighted.css";

export default function HighlightedParts() {
  const { width } = useWindowDimensions();

  return (
    <div className={`highlightedContainer ${deviceCheck(width)}`}>
      {listOfHighlights.map((item) => (
        <div className={`highlightItemContainer ${deviceCheck(width)}`}>
          <div
            className={`highlightItemDescriptionContainer ${deviceCheck(
              width
            )}`}
          >
            <div
              className={`highlightItemDescriptionTitle ${deviceCheck(width)}`}
            >
              {item.title}
            </div>
            <div
              className={`highlightItemDescriptionText ${deviceCheck(width)}`}
            >
              {item.description}
            </div>
          </div>
          <div
            className={`highlightItemImage ${item.image} ${deviceCheck(width)}`}
          />
        </div>
      ))}
      <div className={`galleryButton ${deviceCheck(width)}`}>Gallery</div>
    </div>
  );
}
