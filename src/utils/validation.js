const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export function isEmail(value) {
  return EMAIL.test(String(value || "").trim());
}

export function isPhone(value) {
  return PHONE.test(String(value || "").replace(/\s+/g, ""));
}

export function required(value) {
  return String(value || "").trim().length > 0;
}

export function validateEnquiry(values, extraFields = []) {
  const errors = {};

  if (!required(values.name)) errors.name = "Please enter your full name.";
  else if (values.name.trim().length < 2) errors.name = "Name looks too short.";

  if (!required(values.email)) errors.email = "Email is required.";
  else if (!isEmail(values.email)) errors.email = "Enter a valid email address.";

  if (!required(values.phone)) errors.phone = "Phone number is required.";
  else if (!isPhone(values.phone)) errors.phone = "Enter a valid 10-digit Indian mobile number.";

  extraFields.forEach((field) => {
    if (field.required && !required(values[field.name])) {
      errors[field.name] = field.message || `${field.label} is required.`;
    }
  });

  if (values.message && values.message.length > 2000) {
    errors.message = "Message is too long (max 2000 characters).";
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
