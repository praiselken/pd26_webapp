import type { WeddingEvent } from "../types/wedding";

type EventCardProps = {
  event: WeddingEvent;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article
      style={{
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 8 }}>{event.title}</h2>

      <p style={{ margin: "6px 0" }}>
        <strong>Date:</strong> {event.dateLabel}
      </p>
      <p style={{ margin: "6px 0" }}>
        <strong>Time:</strong> {event.time}
      </p>
      <p style={{ margin: "6px 0" }}>
        <strong>Venue:</strong> {event.venue}
      </p>
      <p style={{ margin: "6px 0" }}>
        <strong>Address:</strong> {event.address}
      </p>

      <a href={event.mapUrl} target="_blank" rel="noreferrer">
        View map →
      </a>
    </article>
  );
}