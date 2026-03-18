import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./pages/Events";
import FAQs from "./pages/FAQS";
import RSVP from "./pages/RSVP";
import AsoEbi from "./pages/AsoEbi";
import Livestream from "./pages/Livestream";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/rsvp" element={<RSVP />} />
      <Route path="/aso-ebi" element={<AsoEbi />} />
      <Route path="/livestream" element={<Livestream />} />

      {/* catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}