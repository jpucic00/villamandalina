import React from "react";
import { Item } from "react-photoswipe-gallery";
import "../assets/style/galleryComps.css";

const GalleryElementComp5 = (props) => {
  return (
    <div className={`galleryElementWrapper ${props.device}`}>
      <div className="galleryElementTitleWrapper">
        <h2 className="galleryElementTitle">{`${props.title}`}</h2>
        <div className="galleryElementTitleLine" />
      </div>

      <Item original={props.image1} thumbnail={props.image1} width="1920" height="1280">
        {({ ref, open }) => (
          <div ref={ref} onClick={open} className="gallery5ItemImage_1">
            <img alt="" src={props.image1} className="galleryItemInnerImage" />
          </div>
        )}
      </Item>
      <Item original={props.image2} thumbnail={props.image2} width="1920" height="1280">
        {({ ref, open }) => (
          <div ref={ref} onClick={open} className="gallery5ItemImage_2">
            <img alt="" src={props.image2} className="galleryItemInnerImage" />
          </div>
        )}
      </Item>
      <Item original={props.image3} thumbnail={props.image3} width="1920" height="1280">
        {({ ref, open }) => (
          <div ref={ref} onClick={open} className="gallery5ItemImage_3">
            <img alt="" src={props.image3} className="galleryItemInnerImage" />
          </div>
        )}
      </Item>
      <Item original={props.image4} thumbnail={props.image4} width="1920" height="1280">
        {({ ref, open }) => (
          <div ref={ref} onClick={open} className="gallery5ItemImage_4">
            <img alt="" src={props.image4} className="galleryItemInnerImage" />
          </div>
        )}
      </Item>
      <Item original={props.image5} thumbnail={props.image5} width="1920" height="1280">
        {({ ref, open }) => (
          <div ref={ref} onClick={open} className="gallery5ItemImage_5">
            <img alt="" src={props.image5} className="galleryItemInnerImage" />
          </div>
        )}
      </Item>
    </div>
  );
};

export default GalleryElementComp5;
