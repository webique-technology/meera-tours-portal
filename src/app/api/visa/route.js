import { visaServices } from "@/data/visa";
import { getQuery, includesText, ok } from "../_lib/respond";

export async function GET(request) {
  const { q } = getQuery(request);
  const data = visaServices.filter((item) =>
    includesText(`${item.country} ${item.title} ${item.type}`, q)
  );
  return ok(data);
}
