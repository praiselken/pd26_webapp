import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WelcomePopup() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const seen = localStorage.getItem("pd26_welcome_seen");

    if (!seen) {
      const timer = window.setTimeout(() => {
        setOpen(true);
      }, 700);

      return () => window.clearTimeout(timer);
    }
  }, []);

  const handleClose = (): void => {
    localStorage.setItem("pd26_welcome_seen", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="welcome-popup-overlay">
      <div className="welcome-popup-card">
  <button
  className="welcome-popup-close"
  onClick={handleClose}
  aria-label="Close welcome popup"
  type="button"
>
  <span aria-hidden="true">×</span>
</button>

        <p className="welcome-popup-eyebrow">Welcome to Our Wedding</p>

        <h2 className="welcome-popup-title">A Message From The Couple</h2>

        <div className="welcome-popup-divider" />

        <p className="welcome-popup-text">
          We are so grateful to have you here and truly honoured to be sharing
          this special season with the people we love most.
        </p>

        <p className="welcome-popup-text">
          Your love, prayers, and presence mean so much to us, and we cannot
          wait to celebrate our wedding day together.
        </p>

        <p className="welcome-popup-reminder">
          Kindly remember to RSVP by <span>20th March</span>.
        </p>

        <div className="welcome-popup-actions">
          <Link
            to="/rsvp"
            className="welcome-popup-btn primary"
            onClick={handleClose}
          >
            RSVP
          </Link>

          <button
            onClick={handleClose}
            className="welcome-popup-btn secondary"
            type="button"
          >
            Continue to Website
          </button>
        </div>
      </div>
    </div>
  );
}