import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import monogram from "../assets/pd26logo.png"; // <- change this to your actual monogram file

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/our-story", label: "Our Story" },
    { to: "/events", label: "Events" },
    { to: "/rsvp", label: "RSVP" },
    { to: "/livestream", label: "Livestream" },
  ];

  return (
    <>
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <NavLink to="/" className="nav-logo" aria-label="Go to homepage">
            <img src={monogram} alt="PD26 monogram" className="nav-logo-img" />
          </NavLink>

          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            className={`nav-toggle ${mobileOpen ? "open" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-overlay ${mobileOpen ? "show" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-drawer-top">
          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            ×
          </button>
        </div>

        <NavLink
          to="/"
          className="mobile-drawer-logo"
          aria-label="Go to homepage"
        >
          <img
            src={monogram}
            alt="PD26 monogram"
            className="mobile-drawer-logo-img"
          />
        </NavLink>

        <nav className="mobile-drawer-links" aria-label="Mobile Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "mobile-drawer-link active"
                  : "mobile-drawer-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}