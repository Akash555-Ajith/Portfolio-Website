"use client";

import { FormEvent, useRef, useState } from "react";
import { EMAIL, socialMedia } from "@/app/data";
import { ContactMessage, sendContactMessage } from "@/app/lib/contact";

export default function ContactSection() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const pending = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    if (fields.get("website")) return;
    const message: ContactMessage = {
      name: String(fields.get("name") ?? "").trim(),
      email: String(fields.get("email") ?? "").trim(),
      subject: String(fields.get("subject") ?? "").trim(),
      message: String(fields.get("message") ?? "").trim(),
    };
    if (Object.values(message).some(value => !value)) {
      setFailed(true);
      setStatus("Please complete every field before sending.");
      return;
    }
    pending.current = true;
    setSending(true);
    setFailed(false);
    setStatus("Submitting your message…");
    try {
      await sendContactMessage(message);
      setStatus("Thank you! Your message has been submitted.");
      form.reset();
    } catch {
      setFailed(true);
      setStatus("We couldn’t confirm your submission. Your message is still here—please try again or email me directly.");
    } finally {
      pending.current = false;
      setSending(false);
    }
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
          <form className="sg-contact-form" onSubmit={submit} aria-busy={sending}>
            <div className="sg-form-trap" aria-hidden="true">
              <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <div className="sg-form-row">
              <label>Name<input name="name" autoComplete="name" required maxLength={100} /></label>
              <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            </div>
            <label>Subject<input name="subject" required maxLength={160} /></label>
            <label>Message<textarea name="message" required maxLength={5000} rows={4} /></label>
            <p className="sg-form-note" id="form-note">Your message is sent to my email through FormSubmit.</p>
            <button className="sg-btn sg-btn-primary" type="submit" disabled={sending} aria-describedby="form-note">{sending ? "Sending…" : "Send message"}</button>
            <p className="sg-form-status" role="status" aria-live="polite">{status}</p>
            {failed && <a className="sg-accent" href={`mailto:${EMAIL}`}>Email me directly</a>}
          </form>
        </div>
        <div className="sg-copyright">© {new Date().getFullYear()} Akash Ajith</div>
      </div>
    </section>
  );
}
