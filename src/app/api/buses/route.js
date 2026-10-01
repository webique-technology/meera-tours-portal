import { busRoutes } from "@/data/buses";
import { getQuery, ok } from "../_lib/respond";

export async function GET(request) {
  const { from, to } = getQuery(request);
  const data = busRoutes.filter((route) => {
    const fromOk = !from || route.from.toLowerCase() === from.toLowerCase();
    const toOk = !to || route.to.toLowerCase() === to.toLowerCase();
    return fromOk && toOk;
  });
  return ok(data);
}
