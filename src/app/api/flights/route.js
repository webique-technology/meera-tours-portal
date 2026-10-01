import { flights } from "@/data/flights";
import { getQuery, ok } from "../_lib/respond";

export async function GET(request) {
  const { from, to, cabin } = getQuery(request);
  const data = flights.filter((flight) => {
    const fromOk = !from || flight.from === from.toUpperCase();
    const toOk = !to || flight.to === to.toUpperCase();
    const cabinOk = !cabin || flight.cabin.toLowerCase() === cabin.toLowerCase();
    return fromOk && toOk && cabinOk;
  });
  return ok(data);
}
