import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import bannerImg from "../assets/head-in-neck.jpg";

type FAQItem = {
  question: string;
  answer?: string;
  custom?: boolean;
};

const weddingColours = [
  { name: "Copper", hex: "#B76A3C" },
  { name: "Truffle", hex: "#A38173" },
  { name: "Mushroom", hex: "#D8C1AF" },
  { name: "Rose Quartz", hex: "#C99384" },
  { name: "Blush", hex: "#E7D1CD" },
];

const faqItems: FAQItem[] = [
  {
    question: "When should I RSVP by?",
    answer:
      "Kindly confirm your attendance through the RSVP section of the website by the 20th of March so that seating and arrangements can be finalised.",
  },
  {
    question: "Will the wedding be livestreamed?",
    answer:
      "Livestream details will be shared closer to the wedding date for those who are unable to attend in person.",
  },
  {
    question: "Is there a gift registry?",
    answer:
      "Your presence and prayers are truly appreciated. Any additional details regarding gifts will be shared if applicable.",
  },
  {
    question: "Can I bring a plus-one?",
    answer:
      "Due to seating arrangements, attendance is limited to those included in the invitation or RSVP confirmation.",
  },
  {
    question: "What is the dress code?",
    custom: true,
  },
  {
    question: "What is the aso ebi details?",
    answer:
      "After you RSVP, you will receive an email with details on how to order aso ebi for the traditional ceremony. You can also place an order on the Aso Ebi page.",
  },
  {
    question: "What is the wedding colour theme?",
    custom: true,
  },
];

type AccordionItemProps = {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
};

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className={`faq-accordion-item ${isOpen ? "open" : ""}`}>
      <button
        type="button"
        className="faq-accordion-trigger"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <span className={`faq-accordion-icon ${isOpen ? "open" : ""}`}>
          +
        </span>
      </button>

      <div className={`faq-accordion-content ${isOpen ? "open" : ""}`}>
        <div className="faq-accordion-inner">
          {!item.custom && item.answer && (
            <p>
              {item.question === "When should I RSVP by?" ? (
                <>
                  Kindly confirm your attendance through the{" "}
                  <Link to="/rsvp" className="faq-inline-link">
                    RSVP
                  </Link>{" "}
                  section of the website by the 20th of March so that seating
                  and arrangements can be finalised.
                </>
              ) : (
                item.answer
              )}
            </p>
          )}

          {item.question === "What is the dress code?" && (
            <div className="faq-custom-content">
              <div className="faq-sub-block">
                <h3>Traditional Ceremony – April 9th</h3>
                <p>Guests are welcome to attend in traditional attire.</p>
                <ul>
                  <li>
                    <strong>Women:</strong> Asoebi lace or elegant traditional
                    wear
                  </li>
                  <li>
                    <strong>Men:</strong> Agbada or Kaftan
                  </li>
                </ul>
              </div>

              <div className="faq-sub-block">
                <h3>White Wedding &amp; Reception – April 11th</h3>
                <p>
                  The dress code is <strong>English Formal / Black Tie</strong>.
                </p>
                <p>
                  Guests are encouraged to dress in elegant gala or red-carpet
                  style attire, such as formal suits, tuxedos, evening gowns, or
                  sophisticated formal dresses.
                </p>
              </div>
            </div>
          )}

          {item.question === "What is the wedding colour theme?" && (
            <div className="faq-custom-content">
              <p>
                The wedding colour palette features warm, elegant tones
                including:
              </p>

              <div className="faq-colours">
                {weddingColours.map((colour) => (
                  <div className="faq-colour-row" key={colour.name}>
                    <span className="faq-colour-name">{colour.name}</span>
                    <span
                      className="faq-colour-pill"
                      style={{ backgroundColor: colour.hex }}
                      aria-label={colour.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main className="faqs-page">
      <Navbar />

      <section
        className="faqs-hero"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="faqs-hero-overlay" />
        <div className="faqs-hero-fade" />

        <div className="faqs-hero-content fade-up">
          <p className="faqs-hero-subtitle">Perfectly Divine</p>
          <h1>Frequently Asked Questions</h1>
          <div className="faq-hero-divider" />
        </div>
      </section>

      <section className="faqs-main">
        <div className="faqs-main-overlay" />

        <div className="faqs-wrapper">
          <div className="faqs-card fade-up delay-1">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}