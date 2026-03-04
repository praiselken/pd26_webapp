import { useEffect, useMemo, useState } from "react";
import bg from "../assets/hands.jpg";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
  heading?: string;
  subheading?: string;
  storageKey?: string;
  password?: string;
};

export default function PasswordGate({
  children,
  heading = "Private Access",
  subheading = "Please enter the invitation password to continue.",
  storageKey = "pd26_gate_access",
  password,
}: Props) {
  const [input, setInput] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const required = useMemo(() => {
    return password || import.meta.env.VITE_PD26_GATE_PASSWORD || "PD26";
  }, [password]);

  // Restore access during session
  useEffect(() => {
    const cached = sessionStorage.getItem(storageKey);
    if (cached === "true") setAllowed(true);
  }, [storageKey]);

  // When unlocked, scroll and focus first input
  useEffect(() => {
    if (!allowed) return;

    setTimeout(() => {
      const formInput = document.querySelector(
        ".form-input"
      ) as HTMLInputElement | null;

      if (formInput) {
        formInput.focus();
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 120);
  }, [allowed]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === required) {
      setAllowed(true);
      sessionStorage.setItem(storageKey, "true");
      return;
    }

    alert("Incorrect password. Please try again.");
  };

  const reset = () => {
    sessionStorage.removeItem(storageKey);
    setAllowed(false);
    setInput("");
  };

  if (allowed) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <section className="rsvp-hero">
        <img src={bg} alt="Wedding" className="rsvp-bg" />
        <div className="rsvp-overlay" />

        <div className="rsvp-container">
          <div className="rsvp-card">
            <h1 className="font-orange text-4xl mb-2">{heading}</h1>
            <p className="font-playfair italic mb-6">{subheading}</p>

          <form onSubmit={submit} className="rsvp-form">
            <div className="form-group">
              <label className="form-label">Password</label>

             <input
  type={showPassword ? "text" : "password"}
  value={input}
  onChange={(e) => setInput(e.target.value)}
  className="password-input"
/>

<button
  type="button"
  className="show-password-btn"
  onClick={() => setShowPassword((s) => !s)}
>
  {showPassword ? "Hide password" : "Show password"}
</button>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Enter
            </button>

            <button
              type="button"
              className="btn btn-secondary w-full"
              style={{ marginTop: 10 }}
              onClick={reset}
            >
              Clear
            </button>
          </form>
        </div>
      </div>
    </section>

    </>
  );
}