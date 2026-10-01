"use client";

import { siteInfo } from "@/data/site";
import { useEnquiryForm } from "@/hooks/useForm";
import { submitContact } from "@/services/content";

const extra = [
  { name: "subject", label: "Subject", required: true, message: "Please add a subject." },
  { name: "message", label: "Message", required: true, message: "Please write a short message." },
];

export default function ContactPage() {
  const form = useEnquiryForm(
    { name: "", email: "", phone: "", subject: "", message: "" },
    extra
  );

  return (
    <section className="section">
      <div className="container two-col">
        <div>
          <div className="eyebrow">Contact</div>
          <h1>Write to the travel desk</h1>
          <p className="lead">
            We reply on phone, WhatsApp and email. For ticket changes, keep your PNR handy.
          </p>
          <div className="grid grid--2">
            <article className="service-tile">
              <h3>Call</h3>
              <p><a href={`tel:${siteInfo.phone.replace(/\s/g, "")}`}>{siteInfo.phone}</a></p>
            </article>
            <article className="service-tile">
              <h3>Email</h3>
              <p><a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a></p>
            </article>
            <article className="service-tile">
              <h3>Visit</h3>
              <p>{siteInfo.address}</p>
            </article>
            <article className="service-tile">
              <h3>Hours</h3>
              <p>{siteInfo.hours}</p>
            </article>
          </div>
        </div>
        <form
          className="contact-form sticky-quote"
          onSubmit={(event) => form.handleSubmit(event, submitContact)}
          noValidate
        >
          <h3>Send a message</h3>
          {form.message ? (
            <div className={`form-alert form-alert--${form.status === "success" ? "success" : "error"}`}>
              {form.message}
            </div>
          ) : null}
          <div className="field">
            <label htmlFor="contact-name">Full name</label>
            <input id="contact-name" name="name" value={form.values.name} onChange={form.handleChange} />
            {form.errors.name ? <span className="field__error">{form.errors.name}</span> : null}
          </div>
          <div className="field">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" value={form.values.email} onChange={form.handleChange} />
            {form.errors.email ? <span className="field__error">{form.errors.email}</span> : null}
          </div>
          <div className="field">
            <label htmlFor="contact-phone">Mobile</label>
            <input id="contact-phone" name="phone" value={form.values.phone} onChange={form.handleChange} />
            {form.errors.phone ? <span className="field__error">{form.errors.phone}</span> : null}
          </div>
          <div className="field">
            <label htmlFor="contact-subject">Subject</label>
            <input id="contact-subject" name="subject" value={form.values.subject} onChange={form.handleChange} />
            {form.errors.subject ? <span className="field__error">{form.errors.subject}</span> : null}
          </div>
          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" value={form.values.message} onChange={form.handleChange} />
            {form.errors.message ? <span className="field__error">{form.errors.message}</span> : null}
          </div>
          <button className="btn btn--primary btn--block" type="submit" disabled={form.isSubmitting}>
            {form.isSubmitting ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
