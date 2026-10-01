import { busRoutes } from "@/data/buses";
import { fail, ok } from "../../_lib/respond";

export async function GET(_request, { params }) {
  const { id } = await params;
  const bus = busRoutes.find((item) => item.id === id);
  if (!bus) return fail("Bus route not found.", 404);
  return ok(bus);
}
