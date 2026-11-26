"use client";

import { FormEvent, useState } from "react";
import { EMAIL, socialMedia } from "@/app/data";

export default function ContactSection() {
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending is not connected yet. Your message has not been sent. You can email me directly using the link below.");
  }
  return (
    <section className="sg-ch4" data-ch id="ch4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sg-ch4-grid" src="/footer-grid.svg" alt="" aria-hidden />
      <div className="sg-reveal sg-contact-inner" data-reveal data-section-scroll tabIndex={0}>
        <h2 className="sg-ch4-h2">Let’s <span className="sg-accent">connect.</span></h2>
        <p className="sg-ch4-p">Web development, Computer Science, and student projects.</p>
        <div className="sg-contact-grid">
          <div className="sg-contact-links">
            {socialMedia.map(social => (
              <a key={social.name} href={social.link} target={social.name === "Email" ? undefined : "_blank"} rel="noopener noreferrer">
                <span className="sg-mono sg-accent">{social.name}</span>
                <span>{social.label}</span>
              </a>
            ))}
          </div>
          <form className="sg-contact-form" onSubmit={submit}>
            <div className="sg-form-row">
              <label>Name<input name="name" autoComplete="name" required maxLength={100} /></label>
              <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            </div>
            <label>Subject<input name="subject" required maxLength={160} /></label>
            <label>Message<textarea name="message" required maxLength={5000} rows={4} /></label>
            <p className="sg-form-note" id="form-note">Direct message sending will be available soon.</p>
            <button className="sg-btn sg-btn-primary" type="submit" aria-describedby="form-note">Send message</button>
            <p className="sg-form-status" role="status" aria-live="polite">{status}</p>
            {status && <a className="sg-accent" href={`mailto:${EMAIL}`}>Email me directly</a>}
          </form>
        </div>
        <div className="sg-copyright">© {new Date().getFullYear()} Akash Ajith</div>
      </div>
    </section>
  );
}
