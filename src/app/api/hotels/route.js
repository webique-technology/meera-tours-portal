import { hotels } from "@/data/hotels";
import { getQuery, includesText, ok } from "../_lib/respond";

const REGION = {
  kullu: ["kullu", "manali"],
  manali: ["kullu", "manali"],
};

export async function GET(request) {
  const { city, q } = getQuery(request);
  const needle = (city || q || "").trim();
  const key = needle.toLowerCase();
  const cities = REGION[key];
  const data = hotels.filter((hotel) => {
    if (!needle) return true;
    if (cities) return cities.includes(String(hotel.city).toLowerCase()) || includesText(hotel.name, needle);
    return includesText(`${hotel.name} ${hotel.city} ${hotel.country}`, needle);
  });
  return ok(data);
}
