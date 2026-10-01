import { airports } from "@/data/flights";
import { ok } from "../../_lib/respond";

export async function GET() {
  return ok(airports);
}
