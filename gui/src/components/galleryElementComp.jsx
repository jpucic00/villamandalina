import React from "react";
import "../assets/style/galleryComps.css";

const GalleryElementComp = (props) => {
  return (
    <div className={`galleryElementWrapper ${props.device}`}>
      <div className="galleryElementTitleWrapper">
        <h2 className="galleryElementTitle">{`${props.title}`}</h2>
        <div className="galleryElementTitleLine" />
      </div>

      <a href={props.image1} className="galleryItemImage1">
        <img src={props.image1} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image2} className="galleryItemImage2">
        <img src={props.image2} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image3} className="galleryItemImage3">
        <img src={props.image3} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image4} className="galleryItemImage4">
        <img src={props.image4} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image5} className="galleryItemImage5">
        <img src={props.image5} className="galleryItemInnerImage"></img>
      </a>
    </div>
  );
};

export default GalleryElementComp;
