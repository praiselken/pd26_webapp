import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-playfair">
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <h2 className="logo">#PD26</h2>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/our-story">Our Story</Link>
          <Link to="/events">Events</Link>
          <Link to="/rsvp">RSVP</Link>
          <Link to="/livestream">Livestream</Link>
        </nav>
      </div>
    </header>
    </div>
  );
}