import React from "react";
import { listOfHighlights } from "../constants/listOfHighlights";
import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import "../assets/style/highlighted.css";
import { easeIn, motion } from "framer-motion";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useInView } from "framer-motion";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function HighlightedParts() {
  const { width } = useWindowDimensions();
  const history = useHistory();
  const animationRef1 = useRef(null);
  const isInView1 = useInView(animationRef1, {
    once: true,
    margin: "0px 100px -50px 0px",
  });

  const animationRef2 = useRef(null);
  const isInView2 = useInView(animationRef2, {
    once: true,
    margin: "0px 100px -50px 0px",
  });

  const animationRef3 = useRef(null);
  const isInView3 = useInView(animationRef3, {
    once: true,
    margin: "0px 100px -50px 0px",
  });
  const [animationArray, setAnimationArray] = useState([
    { animationRef: animationRef1, isInView: isInView1 },
    { animationRef: animationRef2, isInView: isInView2 },
    { animationRef: animationRef3, isInView: isInView3 },
  ]);

  useEffect(() => {
    setAnimationArray([
      { animationRef: animationRef1, isInView: isInView1 },
      { animationRef: animationRef2, isInView: isInView2 },
      { animationRef: animationRef3, isInView: isInView3 },
    ]);
  }, [isInView1, isInView2, isInView3]);

  return (
    <div className={`highlightedContainer ${deviceCheck(width)}`}>
      {console.log(animationArray)}
      {listOfHighlights.map((item, index) => (
        <div
          ref={animationArray[index].animationRef}
          className={`highlightItemContainer ${deviceCheck(width)}`}
        >
          <motion.div
            initial={{ x: index % 2 ? 5000 : -5000 }}
            animate={animationArray[index].isInView ? { x: 0 } : null}
            transition={{ duration: 0.7, type: "easeIn" }}
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
          </motion.div>
          <motion.div
            initial={{ x: index % 2 ? -5000 : 5000 }}
            animate={animationArray[index].isInView ? { x: 0 } : null}
            transition={{ duration: 0.7, type: "easeIn" }}
            className={`highlightItemImage ${item.image} ${deviceCheck(width)}`}
          />
        </div>
      ))}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
        className={`galleryButton ${deviceCheck(width)}`}
        onClick={() => history.push("/gallery")}
      >
        Gallery
      </motion.div>
    </div>
  );
}
