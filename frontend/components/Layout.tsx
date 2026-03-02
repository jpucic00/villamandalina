"use client";

import { usePathname } from "next/navigation";
import NavigationBar from "./NavigationBar";
import Heading from "./Heading";
import Footer from "./Footer";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

interface LayoutProps {
  children: React.ReactNode;
  isHomePage?: boolean;
}

export default function Layout({ children, isHomePage }: LayoutProps) {
  const { width } = useWindowDimensions();
  // Detect home page based on path segments — works with /en/ and /hr/
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isHome = isHomePage ?? pathSegments.length <= 1;

  return (
    <div className={`landingPageContainer ${deviceCheck(width)}`}>
      {isHome ? (
        <Heading />
      ) : (
        <div className={`NavBarOuter ${deviceCheck(width)}`}>
          <div className={`withOverlay ${deviceCheck(width)}`} />
          <div className={`NavBarWrapper ${deviceCheck(width)}`}>
            <a href="/" className={`logo ${deviceCheck(width)}`} />
            <NavigationBar />
          </div>
        </div>
      )}
      <div
        className={`${
          isHome ? "landingPageContentContainer" : "PageContentContainer"
        } ${deviceCheck(width)}`}
      >
        {children}
      </div>
      {isHome ? (
        <>
          <div className={`blueBackground ${deviceCheck(width)}`} />
          <div className={`moreDetailsBlueBackground ${deviceCheck(width)}`} />
        </>
      ) : null}
      <Footer />
    </div>
  );
}
