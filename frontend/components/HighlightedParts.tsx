"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { listOfHighlights } from "@/constants/listOfHighlights";
import { motion, useInView } from "framer-motion";

const MotionLink = motion(Link);
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

export default function HighlightedParts() {
  const { width } = useWindowDimensions();
  const t = useTranslations();

  const highlightKeys = ["firewoodBarbecue", "midnightSwim", "warmAndComfortable"];

  const animationRef1 = useRef(null);
  const isInView1 = useInView(animationRef1, { once: true, margin: "0px 100px -50px 0px" });
  const animationRef2 = useRef(null);
  const isInView2 = useInView(animationRef2, { once: true, margin: "0px 100px -50px 0px" });
  const animationRef3 = useRef(null);
  const isInView3 = useInView(animationRef3, { once: true, margin: "0px 100px -50px 0px" });

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
      {listOfHighlights.map((item, index) => (
        <div
          key={index}
          ref={animationArray[index].animationRef}
          className={`highlightItemContainer ${deviceCheck(width)}`}
        >
          <motion.div
            initial={{ x: index % 2 ? 5000 : -5000 }}
            animate={animationArray[index].isInView ? { x: 0 } : undefined}
            transition={{ duration: 0.7, type: "tween" }}
            className={`highlightItemDescriptionContainer ${deviceCheck(width)}`}
          >
            <div className={`highlightItemDescriptionTitle ${deviceCheck(width)}`}>
              {t(`highlights.${highlightKeys[index]}.title` as any)}
            </div>
            <div className={`highlightItemDescriptionText ${deviceCheck(width)}`}>
              {t(`highlights.${highlightKeys[index]}.description` as any)}
            </div>
          </motion.div>
          <motion.div
            initial={{ x: index % 2 ? -5000 : 5000 }}
            animate={animationArray[index].isInView ? { x: 0 } : undefined}
            transition={{ duration: 0.7, type: "tween" }}
            className={`highlightItemImage ${item.image} ${deviceCheck(width)}`}
          />
        </div>
      ))}
      <MotionLink whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }} className={`galleryButton ${deviceCheck(width)}`} href="/gallery">
        {t("highlights.galleryButton")}
      </MotionLink>
    </div>
  );
}
