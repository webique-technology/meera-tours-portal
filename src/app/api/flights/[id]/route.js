import { flights } from "@/data/flights";
import { fail, ok } from "../../_lib/respond";

export async function GET(_request, { params }) {
  const { id } = await params;
  const flight = flights.find((item) => item.id === id);
  if (!flight) return fail("Flight not found.", 404);
  return ok(flight);
}
