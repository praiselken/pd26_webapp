import {
  buildGoogleCalendarUrl,
  buildIcsDataUrl,
  type CalendarEvent,
} from "../utils/calendar";

type Props = {
  event: CalendarEvent;
};

export default function CalendarButtons({ event }: Props) {
  const googleUrl = buildGoogleCalendarUrl(event);
  const icsUrl = buildIcsDataUrl(event);

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

      {/* GOOGLE CALENDAR */}
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-orange inline-flex items-center justify-center gap-2 rounded-full bg-[#c8a96a] px-5 py-3 text-sm font-medium text-white shadow-md transition hover:scale-[1.03] hover:opacity-90"
      >
        <span>📅</span>
        Add to Google Calendar
      </a>

      {/* APPLE / OUTLOOK */}
      <a
        href={icsUrl}
        download="pd26-event.ics"
        className="font-orange inline-flex items-center justify-center gap-2 rounded-full border border-[#eadcc2] bg-white px-5 py-3 text-sm font-medium text-[#c76b7a] shadow-md transition hover:scale-[1.03] hover:bg-[#fbf7f1]"
      >
        <span>🍎</span>
        Apple / Outlook Calendar
      </a>

    </div>
  );
}