import Navbar from "../components/Navbar";
import hero from "../assets/emailpic.jpg";
import { CalendarDays, MapPin } from "lucide-react";

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
    </main>
  );
}