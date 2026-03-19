import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import monogram from "../assets/img/PD.png";

type NavItem = {
  to: string;
  label: string;
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks: NavItem[] = [
    { to: "/", label: "Home" },
    { to: "/events", label: "Events" },
    { to: "/faqs", label: "FAQs" },
    { to: "/rsvp", label: "RSVP" },
    { to: "/aso-ebi", label: "Aso Ebi" },
    { to: "/livestream", label: "Livestream" },
  ];

  return (
    <>
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <NavLink to="/" className="nav-logo" aria-label="Go to homepage">
            <img src={monogram} alt="PD26 monogram" className="nav-logo-img" />
          </NavLink>

          <nav className="nav-links" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className={`nav-toggle ${mobileOpen ? "open" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((prev) => !prev)}
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
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        className={`mobile-drawer ${mobileOpen ? "open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-drawer-top">
          <button
            type="button"
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
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

        <nav className="mobile-drawer-links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
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