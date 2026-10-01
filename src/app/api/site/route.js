import { ok } from "../_lib/respond";
import { navLinks, siteInfo, stats, whyChooseUs } from "@/data/site";

export async function GET() {
  return ok({ ...siteInfo, navLinks, stats, whyChooseUs });
}
