const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export function validatePayload(body, extra = []) {
  const errors = {};
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const phone = String(body?.phone || "").replace(/\s+/g, "");

  if (name.length < 2) errors.name = "Name is required.";
  if (!EMAIL.test(email)) errors.email = "A valid email is required.";
  if (!PHONE.test(phone)) errors.phone = "A valid 10-digit mobile number is required.";

  extra.forEach((field) => {
    if (field.required && !String(body?.[field.name] || "").trim()) {
      errors[field.name] = `${field.label} is required.`;
    }
  });

  return errors;
}
