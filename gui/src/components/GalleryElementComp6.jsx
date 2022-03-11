import React from "react";
import "../assets/style/galleryComps.css";

const GalleryElementComp6 = (props) => {
  return (
    <div className={`galleryElementWrapper ${props.device}`}>
      <div className="galleryElementTitleWrapper">
        <h2 className="galleryElementTitle">{`${props.title}`}</h2>
        <div className="galleryElementTitleLine" />
      </div>

      <a href={props.image1} className="gallery6ItemImage_1">
        <img src={props.image1} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image2} className="gallery6ItemImage_2">
        <img src={props.image2} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image3} className="gallery6ItemImage_3">
        <img src={props.image3} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image4} className="gallery6ItemImage_4">
        <img src={props.image4} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image5} className="gallery6ItemImage_5">
        <img src={props.image5} className="galleryItemInnerImage"></img>
      </a>
      <a href={props.image6} className="gallery6ItemImage_6">
        <img src={props.image6} className="galleryItemInnerImage"></img>
      </a>
    </div>
  );
};

export default GalleryElementComp6;
