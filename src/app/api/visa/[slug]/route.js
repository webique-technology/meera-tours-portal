import { visaServices } from "@/data/visa";
import { fail, ok } from "../../_lib/respond";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const visa = visaServices.find((item) => item.slug === slug);
  if (!visa) return fail("Visa service not found.", 404);
  return ok(visa);
}
