import React from "react";
import "../assets/style/galleryComps.css";

const galleryNarrowComp = (props) => {
  return (
    <div className={`galleryNarrowWrapper ${props.device}`}>
      <a href={props.image1} className="galleryItemImageNarrow1">
        <img src={props.image1} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image2} className="galleryItemImageNarrow2">
        <img src={props.image2} className="galleryItemInnerImage"></img>
      </a>
    </div>
  );
};

export default galleryNarrowComp;
