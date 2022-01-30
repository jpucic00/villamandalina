import React from "react";
import "../assets/style/galleryComps.css";

const galleryWideComp = (props) => {
  return (
    <div className={`galleryWideWrapper ${props.device}`}>
      <a href={props.image1} className="galleryItemImageWide1">
        <img src={props.image1} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image2} className="galleryItemImageWide2">
        <img src={props.image2} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image3} className="galleryItemImageWide3">
        <img src={props.image3} className="galleryItemInnerImage"></img>
      </a>
    </div>
  );
};

export default galleryWideComp;
