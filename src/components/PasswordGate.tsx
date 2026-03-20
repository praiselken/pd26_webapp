import { useEffect, useMemo, useState } from "react";
import type { ReactNode, FormEvent, ChangeEvent } from "react";
import bg from "../assets/hands.jpg";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
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
  const [input, setInput] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [allowedKeys, setAllowedKeys] = useState<Record<string, boolean>>(() => {
    return {
      [storageKey]: sessionStorage.getItem(storageKey) === "true",
    };
  });

  const allowed = allowedKeys[storageKey] ?? false;

  const required = useMemo(() => {
    return password || import.meta.env.VITE_PD26_GATE_PASSWORD || "PD26";
  }, [password]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!allowed) return;

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

    return () => window.clearTimeout(timer);
  }, [allowed]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === required) {
      sessionStorage.setItem(storageKey, "true");
      setAllowedKeys((prev) => ({
        ...prev,
        [storageKey]: true,
      }));
      return;
    }

    alert("Incorrect password. Please try again.");
  };

  const reset = () => {
    sessionStorage.removeItem(storageKey);
    setAllowedKeys((prev) => ({
      ...prev,
      [storageKey]: false,
    }));
    setInput("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
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
                <label className="form-label" htmlFor="gate-password">
                  Password
                </label>

                <input
                  id="gate-password"
                  type={showPassword ? "text" : "password"}
                  value={input}
                  onChange={handleInputChange}
                  className="password-input"
                  autoComplete="off"
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