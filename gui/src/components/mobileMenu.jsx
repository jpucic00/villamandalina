import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { useState, useEffect, useRef } from "react";
import { navigationMenuItems } from "../constants/menuItems";

export default function MobileMenu() {
  const { width } = useWindowDimensions();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const container = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div>
      {mobileMenuOpen ? (
        <div
          ref={container}
          className={`mobileMenuWrapper  ${deviceCheck(width)}`}
        >
          <div className={`mobileMenuClose  ${deviceCheck(width)}`}>
            <div
              onClick={() => setMobileMenuOpen(false)}
              className={`mobileMenuCloseIcon  ${deviceCheck(width)}`}
            />
          </div>
          <div className={`mobileMenuItemsWrapper ${deviceCheck(width)}`}>
            {navigationMenuItems.map((item) => (
              <a
                href={item.link}
                className={`mobileMenuItems ${
                  window.location.pathname === item.link ? "active" : null
                } ${deviceCheck(width)}`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div
          onClick={() => setMobileMenuOpen(true)}
          className={`mobileMenu  ${deviceCheck(width)}`}
        />
      )}
    </div>
  );
}
