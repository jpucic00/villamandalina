"use client";

import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const [width, setWidth] = useState(1440);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width };
}
