export type CalendarEvent = {
  title: string;
  description: string;
  location: string;
  startUtc: string;
  endUtc: string;
};

export const pd26Events = {
  traditional: {
    title: "PD26 Traditional Ceremony",
    description:
      "Traditional Ceremony for Pastor Deba Erhabor and Sister Precious Amenkhienan.",
    location: "Angels Court, LoveWorld Campground",
    startUtc: "20260409T110000Z", // 12:00 PM Nigeria time
    endUtc: "20260409T150000Z",
  },
  white: {
    title: "PD26 White Wedding",
    description:
      "White Wedding for Pastor Deba Erhabor and Sister Precious Amenkhienan.",
    location: "Bay 2, LoveWorld Campground",
    startUtc: "20260411T090000Z", // 10:00 AM Nigeria time
    endUtc: "20260411T110000Z",
  },
  reception: {
    title: "PD26 Reception",
    description:
      "Reception for Pastor Deba Erhabor and Sister Precious Amenkhienan. The reception will follow immediately after the church ceremony.",
    location: "Crystal Palace, LoveWorld Campground",
    startUtc: "20260411T110000Z",
    endUtc: "20260411T150000Z",
  },
};

export function buildGoogleCalendarUrl(event: CalendarEvent): string {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";

  const params = new URLSearchParams({
    text: event.title,
    dates: `${event.startUtc}/${event.endUtc}`,
    details: event.description,
    location: event.location,
  });

  return `${base}&${params.toString()}`;
}

export function buildIcsDataUrl(event: CalendarEvent): string {
  const ics = buildIcsContent(event);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

function buildIcsContent(event: CalendarEvent): string {
  const uid = `pd26-${event.title.replace(/\s+/g, "-").toLowerCase()}@perfectlydivine`;
  const dtStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PD26//Wedding Calendar//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${event.startUtc}`,
    `DTEND:${event.endUtc}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}