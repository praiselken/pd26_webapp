import Navbar from "../components/Navbar";
import banner from "../assets/stool-smize.jpg"; 
export default function Livestream() {
  return (
    <main className="livestream-page">
      <Navbar />

      {/* HERO */}
      <section
        className="livestream-hero"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="livestream-hero-overlay" />
        <div className="livestream-hero-fade" />

        <div className="livestream-hero-content">
          <p className="livestream-kicker">Join Us Online</p>
          <h1 className="livestream-title">Livestream</h1>
  <div className="livestream-gold-line" />
        </div>
      </section>

      {/* CONTENT */}
      <section className="livestream-section">
        <div className="livestream-container">
          <div className="livestream-card">
            <h2 className="livestream-card-title">Livestream Information</h2>
            <p className="livestream-card-text">
            For guests joining us from afar, our live stream details will be
            shared here closer to the wedding day.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}