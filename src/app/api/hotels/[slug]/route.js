import { hotels } from "@/data/hotels";
import { fail, ok } from "../../_lib/respond";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const hotel = hotels.find((item) => item.slug === slug);
  if (!hotel) return fail("Hotel not found.", 404);
  return ok(hotel);
}
