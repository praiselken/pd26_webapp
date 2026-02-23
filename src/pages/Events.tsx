import EventCard from "../components/eventCard";
import { events } from "../data/events";

export default function EventsPage() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Events</h1>
        <p style={{ marginTop: 8 }}>
          Details for <strong>9 April</strong> and <strong>11 April</strong>.
        </p>
      </header>

      <section style={{ display: "grid", gap: 16 }}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>
    </main>
  );
}