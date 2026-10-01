import { appendRecord } from "../_lib/store";
import { fail, ok } from "../_lib/respond";
import { validatePayload } from "../_lib/validate";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return fail("Invalid JSON body.", 400);
  }

  const errors = validatePayload(body, [
    { name: "subject", label: "Subject", required: true },
    { name: "message", label: "Message", required: true },
  ]);
  if (Object.keys(errors).length) {
    return fail("Please correct the form and try again.", 422, errors);
  }

  const saved = await appendRecord("contact_messages.json", {
    name: body.name.trim(),
    email: body.email.trim(),
    phone: String(body.phone).trim(),
    subject: body.subject.trim(),
    message: body.message.trim(),
  });

  return ok(saved, "Message sent. We typically reply within a few hours.");
}
