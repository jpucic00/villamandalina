import React from "react";

import { ReactComponent as SVGIcon } from "../../assets/images/ArrowSVG.svg";

const ArrowSVG = (props) => {
  const direction = () => {
    if (props.direction === "right") {
      return { transform: `rotate(180deg)` };
    } else {
      return { transform: `rotate(0deg)` };
    }
  };

  return (
    <SVGIcon
      className={props.className}
      onClick={props.onClick}
      style={direction()}
    />
  );
};

export default ArrowSVG;
