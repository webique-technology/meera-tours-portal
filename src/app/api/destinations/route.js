import { destinations } from "@/data/destinations";
import { getQuery, includesText, ok } from "../_lib/respond";

export async function GET(request) {
  const { type, q } = getQuery(request);
  const data = destinations.filter((item) => {
    const typeOk = !type || item.type === type;
    const queryOk = includesText(`${item.name} ${item.country} ${item.tagline}`, q);
    return typeOk && queryOk;
  });
  return ok(data);
}
