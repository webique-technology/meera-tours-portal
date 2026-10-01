import { holidayPackages } from "@/data/packages";
import { getQuery, includesText, ok } from "../_lib/respond";

export async function GET(request) {
  const { destination, theme, q } = getQuery(request);
  const data = holidayPackages.filter((item) => {
    const destOk = !destination || item.destination.toLowerCase() === destination.toLowerCase();
    const themeOk = !theme || item.theme.toLowerCase() === theme.toLowerCase();
    const queryOk = includesText(`${item.title} ${item.destination} ${item.theme}`, q);
    return destOk && themeOk && queryOk;
  });
  return ok(data);
}
