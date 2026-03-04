import hero from "../assets/hands.jpg";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      {/* HERO SECTION */}
      <section className="hero">
        <img src={hero} alt="Wedding Hero" className="hero-img" />
        <div className="hero-gradient" />

        <div className="hero-content">
          <div className="hero-card">
            
            <h1 className="font-orange text-8xl md:text-10xl tracking-wide hero-title-shadow">#PERFECTLYDIVINE26</h1>
            <p className="scripture font-playfair italic text-lg">
              “She is more precious than rubies; nothing you desire can compare
              with her.” — <br /> Proverbs 3:15
            </p>


            <p className="dates font-playfair text-xl tracking-[0.25em] uppercase"> 09.04.2026 &amp; 11.04.2026</p>

           <div className="cta">
  <a href="#our-story" className="btn btn-outline">
    <span>Our Story</span>
  </a>

  <a href="/events" className="btn btn-outline">
    <span>Events</span>
  </a>

  <a href="/rsvp" className="btn btn-outline">
    <span>RSVP</span>
  </a>

  <a href="/livestream" className="btn btn-outline">
    <span>Livestream</span>
  </a>
</div>
          </div>

          {/* Scroll Indicator */}
          <a href="#our-story" className="scroll-indicator" aria-label="Scroll">
            <span className="scroll-mouse" aria-hidden="true" />
            <span className="scroll-text">Scroll</span>
          </a>
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
              <a href="/our-story" className="btn btn-outline-dark">
                Read Our Story
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