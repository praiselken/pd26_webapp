import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./pages/Events";
import OurStory from "./pages/OurStory";
import RSVP from "./pages/RSVP";
import Livestream from "./pages/Livestream";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/our-story" element={<OurStory />} />
      <Route path="/rsvp" element={<RSVP />} />
      <Route path="/livestream" element={<Livestream />} />

      {/* catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}