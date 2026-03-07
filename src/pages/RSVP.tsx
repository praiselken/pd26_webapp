import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import PasswordGate from "../components/PasswordGate";
import bg from "../assets/hands.jpg";

type DescribesYou = "" | "Family" | "Friends" | "Church Ministry" | "Campus Ministry";

type ChurchRole =
  | ""
  | "Regional Pastor"
  | "Zonal Pastor"
  | "Deacon"
  | "Deaconess"
  | "Sister"
  | "Brother";

type CampusRole =
  | ""
  | "Regional Secretary"
  | "Zonal Secretary"
  | "Group Pastor"
  | "Pastor"
  | "Coordinator"
  | "Sister"
  | "Brother";

type AttendOption = "" | "Yes" | "No";

type FormState = {
  title: string;
  fullName: string;
  describesYou: DescribesYou;
  churchRole: ChurchRole;
  campusRole: CampusRole;
  email: string;
  traditional: AttendOption;
  white: AttendOption;
  website: string;
};

type StepKey =
  | "nameBlock"
  | "describesYou"
  | "churchRole"
  | "campusRole"
  | "email"
  | "traditional"
  | "white"
  | "review";

type Step = { key: StepKey; label: string };

/* =========================
   CONFIG
========================= */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxYvNtLRqaANcYo4_jSgW03P2sTG6xqKVK7R24Usm_MgrBqWEjuMp4hmy_CzFcYoL0w/exec";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.22 } },
};

const attendOptions: AttendOption[] = ["Yes", "No"];

const describesOptions: Exclude<DescribesYou, "">[] = [
  "Family",
  "Friends",
  "Church Ministry",
  "Campus Ministry",
];

const churchRoleOptions: Exclude<ChurchRole, "">[] = [
  "Regional Pastor",
  "Zonal Pastor",
  "Deacon",
  "Deaconess",
  "Sister",
  "Brother",
];

const campusRoleOptions: Exclude<CampusRole, "">[] = [
  "Regional Secretary",
  "Zonal Secretary",
  "Group Pastor",
  "Pastor",
  "Coordinator",
  "Sister",
  "Brother",
];

export default function RSVP() {
  const [data, setData] = useState<FormState>({
    title: "",
    fullName: "",
    describesYou: "",
    churchRole: "",
    campusRole: "",
    email: "",
    traditional: "",
    white: "",
    website: "",
  });

  const [step, setStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [glowOption, setGlowOption] = useState<string | null>(null);

  const steps: Step[] = useMemo(() => {
    const base: Step[] = [
      { key: "nameBlock", label: "Details" },
      { key: "describesYou", label: "About You" },
    ];

    if (data.describesYou === "Church Ministry") {
      base.push({ key: "churchRole", label: "Church Role" });
    }

    if (data.describesYou === "Campus Ministry") {
      base.push({ key: "campusRole", label: "Campus Role" });
    }

    base.push(
      { key: "email", label: "Email" },
      { key: "traditional", label: "Traditional" },
      { key: "white", label: "White" },
      { key: "review", label: "Review" }
    );

    return base;
  }, [data.describesYou]);

  useEffect(() => {
    setStep((s) => Math.min(s, steps.length - 1));
  }, [steps.length]);

  const current: StepKey = steps[step]?.key ?? "nameBlock";

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((prev) => {
      if (key === "describesYou") {
        const next = { ...prev, describesYou: value as DescribesYou };
        if (value !== "Church Ministry") next.churchRole = "";
        if (value !== "Campus Ministry") next.campusRole = "";
        return next;
      }
      return { ...prev, [key]: value };
    });
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const jumpTo = (key: StepKey) => {
    const idx = steps.findIndex((s) => s.key === key);
    if (idx >= 0) setStep(idx);
  };

  const validateStep = (): { ok: boolean; message?: string } => {
    switch (current) {
      case "nameBlock":
        if (!data.title) return { ok: false, message: "Please select your title." };
        if (!data.fullName.trim()) return { ok: false, message: "Please enter your full name." };
        return { ok: true };

      case "describesYou":
        if (!data.describesYou) return { ok: false, message: "Please choose one option." };
        return { ok: true };

      case "churchRole":
        if (!data.churchRole) return { ok: false, message: "Please choose your church position." };
        return { ok: true };

      case "campusRole":
        if (!data.campusRole) return { ok: false, message: "Please choose your campus position." };
        return { ok: true };

      case "email":
        if (!data.email.trim()) return { ok: false, message: "Please enter your email." };
        if (!/^\S+@\S+\.\S+$/.test(data.email)) {
          return { ok: false, message: "Please enter a valid email address." };
        }
        return { ok: true };

      case "traditional":
        if (!data.traditional) return { ok: false, message: "Please choose an option." };
        return { ok: true };

      case "white":
        if (!data.white) return { ok: false, message: "Please choose an option." };
        return { ok: true };

      default:
        return { ok: true };
    }
  };

  const handleNext = () => {
    const v = validateStep();
    if (!v.ok) return alert(v.message);
    next();
  };

  const handleSubmit = async () => {
    if (data.website) return;

    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("RSVP submit error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PasswordGate
      heading="RSVP"
      subheading="Please enter the invitation password to RSVP."
      storageKey="pd26_rsvp_access"
      password={import.meta.env.VITE_PD26_RSVP_PASSWORD}
    >
      <>
        <Navbar />

        <section className="rsvp-hero">
          <img src={bg} alt="Wedding" className="rsvp-bg" />
          <div className="rsvp-overlay" />

          <div className="rsvp-container">
            <div className="rsvp-card">
              <h1 className="font-orange text-4xl mb-2">RSVP</h1>
              <p className="font-playfair italic mb-3">
                We would be honoured by your presence.
              </p>

              <div className="rsvp-dots" aria-label="Progress">
                {steps.map((s, i) => (
                  <span
                    key={s.key}
                    className={`rsvp-dot ${i === step ? "active" : ""}`}
                    title={s.label}
                  />
                ))}
              </div>

              {submitted ? (
                <div className="rsvp-success font-playfair mt-6">
                  <p className="rsvp-success-title">Thank you for confirming 💍</p>
                  <p>We look forward to celebrating with you.</p>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    name="website"
                    value={data.website}
                    onChange={(e) => setField("website", e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className={`rsvp-step ${current === "review" ? "rsvp-step-review" : ""}`}>
                    <AnimatePresence mode="wait">
                      <motion.div key={current} {...fade}>
                        {current === "nameBlock" && (
                          <>
                            <p className="rsvp-question">Your details</p>

                            <div className="rsvp-stack">
                              <div className="form-group">
                                <label className="form-label">Title</label>
                                <select
                                  className="form-input"
                                  value={data.title}
                                  onChange={(e) => setField("title", e.target.value)}
                                >
                                  <option value="">Select</option>
                                  <option value="Rev">Rev</option>
                                  <option value="Governor">Governor</option>
                                  <option value="Pastor">Pastor</option>
                                  <option value="Deacon">Deacon</option>
                                  <option value="Deaconess">Deaconess</option>
                                  <option value="Miss">Miss</option>
                                  <option value="Mrs">Mrs</option>
                                  <option value="Mr">Mr</option>
                                </select>
                              </div>

                              <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                  className="form-input"
                                  value={data.fullName}
                                  onChange={(e) => setField("fullName", e.target.value)}
                                  placeholder="Your name"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {current === "describesYou" && (
                          <>
                            <p className="rsvp-question">What best describes you?</p>

                            <div className="choice-grid">
                              {describesOptions.map((opt) => (
                                <button
                                  type="button"
                                  key={opt}
                                  className={`choice-pill ${
                                    data.describesYou === opt ? "selected" : ""
                                  } ${glowOption === opt ? "glow" : ""}`}
                                  onClick={() => {
                                    setField("describesYou", opt);
                                    setGlowOption(opt);

                                    setTimeout(() => {
                                      setGlowOption(null);
                                      next();
                                    }, 300);
                                  }}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </>
                        )}

                        {current === "churchRole" && (
                          <>
                            <p className="rsvp-question">Church ministry — what role?</p>

                            <div className="choice-grid">
                              {churchRoleOptions.map((opt) => (
                                <button
                                  type="button"
                                  key={opt}
                                  className={`choice-pill ${
                                    data.churchRole === opt ? "selected" : ""
                                  } ${glowOption === opt ? "glow" : ""}`}
                                  onClick={() => {
                                    setField("churchRole", opt);
                                    setGlowOption(opt);

                                    setTimeout(() => {
                                      setGlowOption(null);
                                      next();
                                    }, 300);
                                  }}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </>
                        )}

                        {current === "campusRole" && (
                          <>
                            <p className="rsvp-question">Campus ministry — what role?</p>

                            <div className="choice-grid">
                              {campusRoleOptions.map((opt) => (
                                <button
                                  type="button"
                                  key={opt}
                                  className={`choice-pill ${
                                    data.campusRole === opt ? "selected" : ""
                                  } ${glowOption === opt ? "glow" : ""}`}
                                  onClick={() => {
                                    setField("campusRole", opt);
                                    setGlowOption(opt);

                                    setTimeout(() => {
                                      setGlowOption(null);
                                      next();
                                    }, 300);
                                  }}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </>
                        )}

                        {current === "email" && (
                          <>
                            <p className="rsvp-question">Email Address</p>
                            <div className="form-group">
                              <label className="form-label">Email</label>
                              <input
                                className="form-input"
                                type="email"
                                value={data.email}
                                onChange={(e) => setField("email", e.target.value)}
                                placeholder="name@example.com"
                              />
                            </div>
                          </>
                        )}

                        {current === "traditional" && (
                          <>
                            <p className="rsvp-question">Are you attending the traditional wedding?</p>

                            <div className="choice-grid">
                              {attendOptions.map((opt) => (
                                <button
                                  type="button"
                                  key={opt}
                                  className={`choice-pill ${
                                    data.traditional === opt ? "selected" : ""
                                  } ${glowOption === opt ? "glow" : ""}`}
                                  onClick={() => {
                                    setField("traditional", opt);
                                    setGlowOption(opt);

                                    setTimeout(() => {
                                      setGlowOption(null);
                                      next();
                                    }, 300);
                                  }}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </>
                        )}

                        {current === "white" && (
                          <>
                            <p className="rsvp-question">Are you attending the white wedding?</p>

                            <div className="choice-grid">
                              {attendOptions.map((opt) => (
                                <button
                                  type="button"
                                  key={opt}
                                  className={`choice-pill ${
                                    data.white === opt ? "selected" : ""
                                  } ${glowOption === opt ? "glow" : ""}`}
                                  onClick={() => {
                                    setField("white", opt);
                                    setGlowOption(opt);

                                    setTimeout(() => {
                                      setGlowOption(null);
                                      next();
                                    }, 300);
                                  }}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </>
                        )}

                        {current === "review" && (
                          <>
                            <p className="rsvp-question">Review your RSVP</p>

                            <div className="review-box font-playfair">
                              <ReviewRow label="Title" value={data.title} onEdit={() => jumpTo("nameBlock")} />
                              <ReviewRow label="Full Name" value={data.fullName} onEdit={() => jumpTo("nameBlock")} />
                              <ReviewRow
                                label="Describes You"
                                value={data.describesYou}
                                onEdit={() => jumpTo("describesYou")}
                              />

                              {data.describesYou === "Church Ministry" && (
                                <ReviewRow
                                  label="Church Role"
                                  value={data.churchRole}
                                  onEdit={() => jumpTo("churchRole")}
                                />
                              )}

                              {data.describesYou === "Campus Ministry" && (
                                <ReviewRow
                                  label="Campus Role"
                                  value={data.campusRole}
                                  onEdit={() => jumpTo("campusRole")}
                                />
                              )}

                              <ReviewRow label="Email" value={data.email} onEdit={() => jumpTo("email")} />
                              <ReviewRow
                                label="Traditional Wedding"
                                value={data.traditional}
                                onEdit={() => jumpTo("traditional")}
                              />
                              <ReviewRow label="White Wedding" value={data.white} onEdit={() => jumpTo("white")} />
                            </div>

                            <button
                              type="button"
                              className="btn btn-primary w-full"
                              onClick={handleSubmit}
                              disabled={loading}
                            >
                              {loading ? "Submitting..." : "Submit RSVP"}
                            </button>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="rsvp-nav">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={back}
                      disabled={step === 0}
                      style={{ opacity: step === 0 ? 0.45 : 1 }}
                    >
                      Back
                    </button>

                    {current !== "review" && (
                      <button type="button" className="btn btn-primary" onClick={handleNext}>
                        Next
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </>
    </PasswordGate>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="review-row">
      <div>
        <p className="review-label">{label}</p>
        <p className="review-value">{value || "—"}</p>
      </div>

      <button type="button" className="review-edit" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
}