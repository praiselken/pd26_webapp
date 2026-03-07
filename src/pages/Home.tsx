import hero from "../assets/hands.jpg";
import Navbar from "../components/Navbar";
import WelcomePopup from "../components/WelcomePopup";

export default function Home() {
  return (
    <main>
      <WelcomePopup />
      <Navbar />
      {/* HERO SECTION */}
<section className="hero">
  <img src={hero} alt="Wedding Hero" className="hero-img" />

  {/* Gradient Overlay */}
  <div className="hero-gradient" />

  <div className="hero-content">
    <h1 className="font-orange hero-title hero-title-shadow">
      #PERFECTLYDIVINE26
    </h1>

    <p className="scripture font-playfair italic">
      “She is more precious than rubies; nothing you desire can compare with her.”
      <br />
      <span className="scripture-ref">— Proverbs 3:15</span>
    </p>

    <p className="dates font-playfair uppercase">
      09.04.2026 &amp; 11.04.2026
    </p>

    <div className="cta">
      <a href="/events" className="btn btn-outline">
        <span>Events</span>
      </a>

      <a href="/rsvp" className="btn btn-outline">
        <span>RSVP</span>
      </a>

      <a href="/faqs" className="btn btn-outline">
        <span>FAQs</span>
      </a>

      <a href="/livestream" className="btn btn-outline">
        <span>Livestream</span>
      </a>
    </div>
  </div>
</section>

      {/* OUR STORY PREVIEW SECTION */}
      <section id="our-story" className="section">
        <div className="container">
          <div className="story-preview">
            <p className="eyebrow font-playfair">Our Story</p>
            <h2 className="story-title font-orange">A journey worth celebrating</h2>
            <p className="story-text font-playfair">
              Welcome to our wedding celebration. Here you’ll find key dates,
              locations, RSVP details, and livestream access. We can’t wait to
              share this moment with you.
            </p>

            <div className="font-playfair story-actions">
              <a href="/faqs" className="btn btn-outline-dark">
                FAQs and Dress Code
              </a>
              <a href="/events" className="btn btn-outline-dark">
                View Events
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}