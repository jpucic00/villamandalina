import deviceCheck from "../util/deviceCheck";
import useWindowDimensions from "../util/useWindowDimensions";
import { useState, useEffect, useRef } from "react";
import { navigationMenuItems } from "../constants/menuItems";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";
import { toast } from "react-toastify";

export default function MobileMenu() {
  const { width } = useWindowDimensions();
  const [user, loading] = useAuthState(auth);
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

  const doLogout = () => {
    try {
      logout();
      setMobileMenuOpen(false);
      toast.success("Logged out");
    } catch {
      toast.error("Failed to logout");
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
            <a href="/" className={`logo ${deviceCheck(width)}`} />
            <div
              onClick={() => setMobileMenuOpen(false)}
              className={`mobileMenuCloseIcon  ${deviceCheck(width)}`}
            />
          </div>
          <div className={`mobileMenuItemsWrapper ${deviceCheck(width)}`}>
            {navigationMenuItems.map((item) => (
              <a
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
      ) : (
        <div
          onClick={() => setMobileMenuOpen(true)}
          className={`mobileMenu  ${deviceCheck(width)}`}
        />
      )}
    </div>
  );
}
