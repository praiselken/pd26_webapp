import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Navbar from "../components/Navbar";
import hero from "../assets/IMG_8785.jpg";

type AsoEbiFormData = {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  outfitType: string;
  sizePreference: string;
  quantity: number;
  tailoringRequired: string;
  bustChest: string;
  waist: string;
  hips: string;
  shoulder: string;
  sleeveLength: string;
  dressTopLength: string;
  skirtTrouserLength: string;
  height: string;
  pickupOrDelivery: string;
  notes: string;
  botcheck: string;
};

const initialForm: AsoEbiFormData = {
  fullName: "",
  email: "",
  phone: "",
  category: "",
  outfitType: "",
  sizePreference: "",
  quantity: 1,
  tailoringRequired: "Yes",
  bustChest: "",
  waist: "",
  hips: "",
  shoulder: "",
  sleeveLength: "",
  dressTopLength: "",
  skirtTrouserLength: "",
  height: "",
  pickupOrDelivery: "",
  notes: "",
  botcheck: "",
};

export default function AsoEbi() {
  const [formData, setFormData] = useState<AsoEbiFormData>(initialForm);
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) || 1 : value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.botcheck) {
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!accessKey) {
      setStatus("Form configuration is missing. Please try again later.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending your order...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "PD26 Aso Ebi Order Submission",
          from_name: "Perfectly Divine 2026",
          ...formData,
        }),
      });

      const result: { success?: boolean; message?: string } =
        await response.json();

      if (result.success) {
        setStatus(
          "Thank you — your Aso Ebi order has been submitted successfully."
        );
        setFormData(initialForm);
      } else {
        setStatus(result.message || "Sorry, something went wrong. Please try again.");
      }
    } catch {
      setStatus("Sorry, something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="asoebi-page">
      <Navbar />

      <section
        className="asoebi-hero"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="asoebi-hero-overlay" />
        <div className="asoebi-hero-fade" />

        <div className="asoebi-hero-content">
          <p className="asoebi-eyebrow">Dress the Part</p>
          <h1>Aso Ebi</h1>
          <div className="faq-hero-divider" />
          <p className="asoebi-subtext">
            We would love for you to celebrate with us in coordinated Nigerian
            wedding attire. Please read the details below and submit your order
            directly to the tailor using the form provided.
          </p>
        </div>
      </section>

      <section className="asoebi-section">
        <div className="asoebi-container asoebi-grid">
          <article className="asoebi-card">
            <h2>The Aso Ebi</h2>
            <p>
              Our Aso Ebi has been chosen to reflect the beauty, elegance, and
              joy of our wedding celebration. If you would like to order fabric
              and/or tailoring, please complete the form below with your details
              and measurements.
            </p>
            <p>
              Once submitted, your request will be sent directly to the tailor
              for processing and follow-up where required.
            </p>
          </article>

          <article className="asoebi-card">
            <h2>Important Information</h2>
            <ul className="asoebi-list">
              <li>Orders must be submitted before the stated deadline</li>
              <li>Please ensure measurements are accurate before sending</li>
              <li>The tailor may contact you for clarification if needed</li>
              <li>Payment and collection details will be shared separately</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="asoebi-section asoebi-section-soft">
        <div className="asoebi-container asoebi-grid">
          <article className="asoebi-card">
            <h2>Available Options</h2>
            <ul className="asoebi-list">
              <li>Ladies dress tailoring</li>
              <li>Men’s agbada or senator styles</li>
              <li>Children’s outfits</li>
              <li>Fabric-only orders</li>
              <li>Headwrap / gele coordination</li>
            </ul>
          </article>


        </div>
      </section>

      <section className="asoebi-section">
        <div className="asoebi-container">
          <div className="asoebi-form-card">
            <div className="asoebi-form-heading">
              <p className="asoebi-mini-heading">Order Form</p>
              <h2>Submit Your Aso Ebi Request</h2>
              <p>
                Please complete the form carefully. Your order will be sent
                directly to the tailor.
              </p>
            </div>

            <form className="asoebi-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="botcheck"
                value={formData.botcheck}
                onChange={handleChange}
                className="hidden-field"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="asoebi-form-grid">
                <div className="form-field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Adult Female">Adult Female</option>
                    <option value="Adult Male">Adult Male</option>
                    <option value="Child">Child</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="outfitType">Outfit Type</label>
                  <select
                    id="outfitType"
                    name="outfitType"
                    value={formData.outfitType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select outfit type</option>
                    <option value="Ladies Dress">Ladies Dress</option>
                    <option value="Men’s Agbada">Men’s Agbada</option>
                    <option value="Senator Style">Senator Style</option>
                    <option value="Children’s Outfit">Children’s Outfit</option>
                    <option value="Fabric Only">Fabric Only</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="sizePreference">Size Preference</label>
                  <input
                    id="sizePreference"
                    type="text"
                    name="sizePreference"
                    placeholder="e.g. UK 12, Large, Custom"
                    value={formData.sizePreference}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    min={1}
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="tailoringRequired">Tailoring Required?</label>
                  <select
                    id="tailoringRequired"
                    name="tailoringRequired"
                    value={formData.tailoringRequired}
                    onChange={handleChange}
                    required
                  >
                    <option value="Yes">Yes</option>
                    <option value="No - Fabric Only">No - Fabric Only</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="bustChest">Bust / Chest</label>
                  <input
                    id="bustChest"
                    type="text"
                    name="bustChest"
                    value={formData.bustChest}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="waist">Waist</label>
                  <input
                    id="waist"
                    type="text"
                    name="waist"
                    value={formData.waist}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="hips">Hips</label>
                  <input
                    id="hips"
                    type="text"
                    name="hips"
                    value={formData.hips}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="shoulder">Shoulder</label>
                  <input
                    id="shoulder"
                    type="text"
                    name="shoulder"
                    value={formData.shoulder}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="sleeveLength">Sleeve Length</label>
                  <input
                    id="sleeveLength"
                    type="text"
                    name="sleeveLength"
                    value={formData.sleeveLength}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="dressTopLength">Dress / Top Length</label>
                  <input
                    id="dressTopLength"
                    type="text"
                    name="dressTopLength"
                    value={formData.dressTopLength}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="skirtTrouserLength">
                    Skirt / Trouser Length
                  </label>
                  <input
                    id="skirtTrouserLength"
                    type="text"
                    name="skirtTrouserLength"
                    value={formData.skirtTrouserLength}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="height">Height</label>
                  <input
                    id="height"
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field form-field-full">
                  <label htmlFor="pickupOrDelivery">
                    Pickup or Delivery Preference
                  </label>
                  <input
                    id="pickupOrDelivery"
                    type="text"
                    name="pickupOrDelivery"
                    placeholder="e.g. Collection, UK delivery, international delivery"
                    value={formData.pickupOrDelivery}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field form-field-full">
                  <label htmlFor="notes">Additional Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={6}
                    placeholder="Add style notes, preferred fit, gele request, special measurements, or any extra information here."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="asoebi-actions">
                <button
                  type="submit"
                  className="asoebi-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Order"}
                </button>

                {status && <p className="asoebi-status">{status}</p>}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}