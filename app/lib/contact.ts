import { EMAIL } from "@/app/data";

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** FormSubmit accepts the message; inbox delivery requires owner activation. */
export async function sendContactMessage(message: ContactMessage) {
  const response = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...message,
      _subject: `Portfolio: ${message.subject}`,
      _replyto: message.email,
      _template: "table",
      _honey: "",
    }),
    signal: AbortSignal.timeout(20000),
  });
  const result = await response.json();
  if (!response.ok || (result.success !== true && result.success !== "true")) {
    throw new Error("The email service did not accept the message.");
  }
}
