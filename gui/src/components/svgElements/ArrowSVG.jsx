import React from "react";

import { ReactComponent as SVGIcon } from "../../assets/images/ArrowSVG.svg";

const ArrowSVG = (props) => {
  const direction = () => {
    switch (props.direction) {
      case "right":
        return { transform: `rotate(180deg)` };
      case "up":
        return { transform: `rotate(90deg)` };
      case "down":
        return { transform: `rotate(270deg)` };
      case "left":
        return { transform: `rotate(0deg)` };
      default:
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
