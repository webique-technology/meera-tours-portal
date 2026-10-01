import { offers } from "@/data/offers";
import { ok } from "../_lib/respond";

export async function GET() {
  return ok(offers);
}
