import React from "react";
import "../assets/style/galleryComps.css";

const GalleryElementComp7 = (props) => {
  return (
    <div className={`galleryElementWrapper ${props.device}`}>
      <div className="galleryElementTitleWrapper">
        <h2 className="galleryElementTitle">{`${props.title}`}</h2>
        <div className="galleryElementTitleLine" />
      </div>

      <a href={props.image1} className="gallery7ItemImage_1">
        <img src={props.image1} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image2} className="gallery7ItemImage_2">
        <img src={props.image2} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image3} className="gallery7ItemImage_3">
        <img src={props.image3} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image4} className="gallery7ItemImage_4">
        <img src={props.image4} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image5} className="gallery7ItemImage_5">
        <img src={props.image5} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image6} className="gallery7ItemImage_6">
        <img src={props.image6} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image7} className="gallery7ItemImage_7">
        <img src={props.image7} className="galleryItemInnerImage"></img>
      </a>
    </div>
  );
};

export default GalleryElementComp7;
