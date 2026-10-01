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
    { name: "type", label: "Enquiry type", required: true },
  ]);
  if (Object.keys(errors).length) {
    return fail("Please correct the form and try again.", 422, errors);
  }

  const saved = await appendRecord("enquiries.json", {
    type: body.type,
    name: body.name.trim(),
    email: body.email.trim(),
    phone: String(body.phone).trim(),
    message: String(body.message || "").trim(),
    details: body.details || {},
  });

  return ok(saved, "Enquiry received. Our travel desk will contact you shortly.");
}
