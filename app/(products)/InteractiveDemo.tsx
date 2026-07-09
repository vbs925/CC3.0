"use client";

import { useState } from "react";
import styles from "./InteractiveDemo.module.css";

interface InteractiveDemoProps {
  data: {
    demo: {
      label: string;
      heading: string;
      description: string;
      note: string;
      useCases: string[];
      form: {
        nameLabel: string;
        namePlaceholder: string;
        phoneLabel: string;
        phonePlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        useCaseLabel: string;
        agreementText: string;
        buttonLabel: string;
      };
    };
    testimonial: {
      quote: string;
      author: string;
      role: string;
      statValue: string;
      statLabel: string;
    };
  };
}

export default function InteractiveDemo({ data }: InteractiveDemoProps) {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!data) return null;
  const { demo, testimonial } = data;

  const handleSubmit = async () => {
    if (!name || !email) {
      setErrorMessage("Name and email are required.");
      return;
    }
    if (!agreed) {
      setErrorMessage("Please agree to the privacy policy.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/cms/submit-demo/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, useCase: selectedCase || "" }),
      });
      const resData = await res.json();
      if (resData.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(resData.error || "An error occurred.");
      }
    } catch (e) {
      setStatus("error");
      setErrorMessage("Failed to submit request.");
    }
  };

  return (
    <section id="demo" className={styles.section} aria-label="Interactive Demo Section">
      <div className={styles.container}>
        {/* ── Testimonial Block ── */}
        <div className={styles.testimonialCard}>
          <div className={styles.testimonialQuoteArea}>
            <p className={styles.quote}>{testimonial.quote}</p>
            <div className={styles.authorArea}>
              <div className={styles.avatar}>SD</div>
              <div className={styles.authorInfo}>
                <p className={styles.authorName}>{testimonial.author}</p>
                <p className={styles.authorRole}>{testimonial.role}</p>
              </div>
            </div>
          </div>

          <div className={styles.testimonialDivider}></div>

          <div className={styles.testimonialStatArea}>
            <h3 className={styles.statValue}>{testimonial.statValue}</h3>
            <p className={styles.statLabel}>{testimonial.statLabel}</p>
          </div>
        </div>

        {/* ── Demo Block ── */}
        <div className={styles.demoBlock}>
          {/* Left Text */}
          <div className={styles.demoText}>
            <p className={styles.label}>{demo.label}</p>
            <h2 className={styles.heading}>{demo.heading}</h2>
            <p className={styles.description}>{demo.description}</p>
            <p className={styles.note}>
              <span className={styles.dot}></span> {demo.note}
            </p>
          </div>

          {/* Right Form Card */}
          <div className={styles.formCard}>
            <div className={styles.formGroup}>
              <label>{demo.form.nameLabel}</label>
              <input 
                type="text" 
                placeholder={demo.form.namePlaceholder} 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>

            <div className={styles.formGroup}>
              <label>{demo.form.phoneLabel}</label>
              <div className={styles.phoneInput}>
                <select>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input 
                  type="tel" 
                  placeholder={demo.form.phonePlaceholder} 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>{demo.form.emailLabel}</label>
              <input 
                type="email" 
                placeholder={demo.form.emailPlaceholder} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.monoLabel}>{demo.form.useCaseLabel}</label>
              <div className={styles.pillGroup}>
                {demo.useCases.map((uc, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCase(uc)}
                    className={`${styles.pill} ${selectedCase === uc ? styles.pillActive : ""}`}
                  >
                    {uc}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.agreementGroup}>
              <button
                className={`${styles.toggleSwitch} ${agreed ? styles.toggleActive : ""}`}
                onClick={() => setAgreed(!agreed)}
                type="button"
                aria-pressed={agreed}
              >
                <span className={styles.toggleKnob}></span>
              </button>
              <p className={styles.agreementText}>
                {demo.form.agreementText}
              </p>
            </div>

            <button 
              className={styles.submitBtn} 
              onClick={handleSubmit} 
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "Submitting..." : status === "success" ? "Request Sent!" : demo.form.buttonLabel}
            </button>
            {errorMessage && <p style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
