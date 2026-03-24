import Navbar from "../components/Navbar";
import hero from "../assets/emailpic.jpg";
import { CalendarDays, MapPin, Navigation } from "lucide-react";

const events = [
  {
    title: "Traditional Ceremony",
    date: "April 9th, 2026",
    time: "12:00pm",
    venue: "Angels Court",
    location: "LoveWorld Campground.",
  },
  {
    title: "White Wedding (Church Service)",
    date: "April 11th, 2026",
    time: "10:00am",
    venue: "Bay 2",
    location: "LoveWorld Campground.",
  },
  {
    title: "Reception",
    date: "April 11th, 2026",
    time: "Follows immediately after the ceremony.",
    venue: "Crystal Palace",
    location: "LoveWorld Campground.",
  },
];

export default function Events() {
  const mapQuery = encodeURIComponent(
    "LoveWorld Campground, Asese, Ogun State, Nigeria"
  );

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openAppleMaps = () => {
    window.open(
      `https://maps.apple.com/?q=${mapQuery}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="events-page">
      <Navbar />

      <section className="events-hero">
        <div
          className="events-hero-bg"
          style={{ backgroundImage: `url(${hero})` }}
        />
        <div className="events-hero-overlay" />
        <div className="events-hero-fade" />

        <div className="events-hero-content">
          <p className="events-kicker">Our Wedding Weekend</p>
          <h1 className="events-title">Schedule</h1>
          <div className="faq-hero-divider" />
        </div>
      </section>

      <section className="events-section">
        <div className="events-container">
          {events.map((event, index) => (
            <article
              key={index}
              className="event-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h2 className="event-heading">{event.title}</h2>
              <div className="event-divider" />

              <div className="event-row">
                <div className="event-icon-wrap">
                  <CalendarDays size={20} strokeWidth={1.8} />
                </div>
                <div className="event-info">
                  <h3>{event.date}</h3>
                  <p>{event.time}</p>
                </div>
              </div>

              <div className="event-row">
                <div className="event-icon-wrap">
                  <MapPin size={20} strokeWidth={1.8} />
                </div>
                <div className="event-info">
                  <h3>{event.venue}</h3>
                  <p>{event.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pd-map-block">
        <div className="pd-map-block__inner">
          <div className="pd-map-block__header">
            <p className="pd-map-block__kicker">Venue Location</p>
            <h2 className="pd-map-block__title">Find the Wedding Venue</h2>
            <p className="pd-map-block__text">
              View the venue below or open directions in your preferred maps
              app.
            </p>

            <div className="pd-map-block__actions">
              <button
                type="button"
                className="pd-map-btn pd-map-btn--primary"
                onClick={openGoogleMaps}
              >
                <Navigation size={16} strokeWidth={1.8} />
                Google Maps
              </button>

              <button
                type="button"
                className="pd-map-btn pd-map-btn--secondary"
                onClick={openAppleMaps}
              >
                <Navigation size={16} strokeWidth={1.8} />
                Apple Maps
              </button>
            </div>
          </div>

          <div className="pd-map-block__frame">
            <iframe
              title="Wedding venue map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.803936146784!2d3.4315011575075434!3d6.762270060498329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103ba3e71c8a411f%3A0x2ff0d7ab9bda69ea!2sLoveWorld%20Campground!5e0!3m2!1sen!2suk!4v1774392710007!5m2!1sen!2suk"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}