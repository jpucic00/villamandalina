import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { navigationMenuItems } from "../constants/menuItems";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";
import { toast } from "react-toastify";

export default function MobileMenu() {
  const { width } = useWindowDimensions();
  const [user, loading] = useAuthState(auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const container = useRef();
  const backdrop = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleClickOutside = (event) => {
    if (
      mobileMenuOpen &&
      container.current &&
      !container.current.contains(event.target) &&
      backdrop.current &&
      backdrop.current.contains(event.target)
    ) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const doLogout = () => {
    try {
      logout();
      handleClose();
      toast.success("Logged out");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const mobileMenuContent = mobileMenuOpen && (
    <>
      <div
        ref={backdrop}
        className={`mobileMenuBackdrop ${isClosing ? 'closing' : ''}`}
      />
      <div
        ref={container}
        className={`mobileMenuWrapper ${isClosing ? 'closing' : 'open'} ${deviceCheck(width)}`}
      >
        <div className={`mobileMenuClose  ${deviceCheck(width)}`}>
          <a href="/" className={`logo ${deviceCheck(width)}`} />
          <div
            onClick={handleClose}
            className={`mobileMenuCloseIcon  ${deviceCheck(width)}`}
          />
        </div>
        <div className={`mobileMenuItemsWrapper ${deviceCheck(width)}`}>
          {navigationMenuItems.map((item) => (
            <a
              key={item.link}
              href={user && item.name === "Log in" ? null : item.link}
              onClick={user && item.name === "Log in" ? doLogout : null}
              className={`mobileMenuItems ${
                window.location.pathname === item.link ? "active" : null
              } ${deviceCheck(width)}`}
            >
              {item.name === "Log in"
                ? user && !loading
                  ? "Log out"
                  : !loading && item.name
                : item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      {!mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(true)}
          className={`mobileMenu  ${deviceCheck(width)}`}
        />
      )}
      {mobileMenuOpen && createPortal(mobileMenuContent, document.body)}
    </>
  );
}
