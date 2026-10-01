"use client";

import { useState } from "react";
import { hasErrors, validateEnquiry } from "@/utils/validation";

export function useEnquiryForm(initialValues, extraFields = []) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(event, submitter) {
    event.preventDefault();
    const nextErrors = validateEnquiry(values, extraFields);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      setStatus("error");
      setMessage("Please fix the highlighted fields.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const result = await submitter(values);
      setStatus("success");
      setMessage(result?.message || "Thank you. Our travel desk will call you shortly.");
      setValues(initialValues);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "We could not send this enquiry. Please try again.");
    }
  }

  return {
    values,
    errors,
    status,
    message,
    handleChange,
    handleSubmit,
    isSubmitting: status === "loading",
  };
}
