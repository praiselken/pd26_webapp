import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-playfair">
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <h2 className="logo">#PD26</h2>

          {/* Desktop Navigation */}
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/rsvp">RSVP</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/livestream">Livestream</Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              // X icon (WHITE)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              </svg>
            ) : (
              // hamburger (WHITE)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="mobile-menu-wrapper">
          {/* click-outside layer */}
          <div
            className="mobile-menu-overlay"
            onClick={() => setMobileOpen(false)}
          />

          {/* menu */}
          <div className="mobile-menu">
            <NavLink to="/" onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/events" onClick={() => setMobileOpen(false)}>
              Events
            </NavLink>
            <NavLink to="/rsvp" onClick={() => setMobileOpen(false)}>
              RSVP
            </NavLink>
                  <NavLink to="/faqs" onClick={() => setMobileOpen(false)}>
              FAQs
            </NavLink>
            <NavLink to="/livestream" onClick={() => setMobileOpen(false)}>
              Livestream
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}