import React from "react";
import "../assets/style/galleryComps.css";

const GalleryElementComp5 = (props) => {
  return (
    <div className={`galleryElementWrapper ${props.device}`}>
      <div className="galleryElementTitleWrapper">
        <h2 className="galleryElementTitle">{`${props.title}`}</h2>
        <div className="galleryElementTitleLine" />
      </div>

      <a href={props.image1} className="gallery5ItemImage_1">
        <img alt="" src={props.image1} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image2} className="gallery5ItemImage_2">
        <img alt="" src={props.image2} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image3} className="gallery5ItemImage_3">
        <img alt="" src={props.image3} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image4} className="gallery5ItemImage_4">
        <img alt="" src={props.image4} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image5} className="gallery5ItemImage_5">
        <img alt="" src={props.image5} className="galleryItemInnerImage"></img>
      </a>
    </div>
  );
};

export default GalleryElementComp5;
