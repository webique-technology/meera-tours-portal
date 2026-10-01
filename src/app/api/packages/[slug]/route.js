import { holidayPackages } from "@/data/packages";
import { fail, ok } from "../../_lib/respond";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const pack = holidayPackages.find((item) => item.slug === slug);
  if (!pack) return fail("Package not found.", 404);
  return ok(pack);
}
