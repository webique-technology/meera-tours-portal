"use client";

import { useEnquiryForm } from "@/hooks/useForm";
import { submitEnquiry } from "@/services/content";

export default function EnquiryForm({
  type,
  title = "Send an enquiry",
  details = {},
  extraFields = [],
  submitLabel = "Request a callback",
}) {
  const initial = {
    name: "",
    email: "",
    phone: "",
    message: "",
    ...extraFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
  };

  const form = useEnquiryForm(initial, extraFields);

  return (
    <form
      className="enquiry-form"
      onSubmit={(event) =>
        form.handleSubmit(event, (values) =>
          submitEnquiry({
            ...values,
            type,
            details,
          })
        )
      }
      noValidate
    >
      {title ? <h3>{title}</h3> : null}
      {form.message ? (
        <div className={`form-alert form-alert--${form.status === "success" ? "success" : "error"}`}>
          {form.message}
        </div>
      ) : null}

      <div className="field">
        <label htmlFor={`${type}-name`}>Full name</label>
        <input id={`${type}-name`} name="name" value={form.values.name} onChange={form.handleChange} />
        {form.errors.name ? <span className="field__error">{form.errors.name}</span> : null}
      </div>
      <div className="field">
        <label htmlFor={`${type}-email`}>Email</label>
        <input id={`${type}-email`} name="email" type="email" value={form.values.email} onChange={form.handleChange} />
        {form.errors.email ? <span className="field__error">{form.errors.email}</span> : null}
      </div>
      <div className="field">
        <label htmlFor={`${type}-phone`}>Mobile</label>
        <input id={`${type}-phone`} name="phone" value={form.values.phone} onChange={form.handleChange} placeholder="10-digit mobile" />
        {form.errors.phone ? <span className="field__error">{form.errors.phone}</span> : null}
      </div>

      {extraFields.map((field) => (
        <div className="field" key={field.name}>
          <label htmlFor={`${type}-${field.name}`}>{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              id={`${type}-${field.name}`}
              name={field.name}
              value={form.values[field.name]}
              onChange={form.handleChange}
            />
          ) : (
            <input
              id={`${type}-${field.name}`}
              name={field.name}
              type={field.type || "text"}
              value={form.values[field.name]}
              onChange={form.handleChange}
            />
          )}
          {form.errors[field.name] ? <span className="field__error">{form.errors[field.name]}</span> : null}
        </div>
      ))}

      <div className="field">
        <label htmlFor={`${type}-message`}>Notes</label>
        <textarea
          id={`${type}-message`}
          name="message"
          value={form.values.message}
          onChange={form.handleChange}
          placeholder="Dates, travellers, budget or special requests"
        />
      </div>

      <button className="btn btn--primary btn--block" type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}
