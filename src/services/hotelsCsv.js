import fs from "fs";
import path from "path";
import Papa from "papaparse";

export function getHotelsFromCsv() {
  // Check common possible paths
  const possiblePaths = [
    path.join(process.cwd(), "src", "data", "hotels.csv"),
    path.join(process.cwd(), "src", "data", "indian_hotels.csv"),
    path.join(process.cwd(), "data", "hotels.csv"),
  ];

  const filePath = possiblePaths.find((p) => fs.existsSync(p));

  if (!filePath) {
    console.error("CSV file not found in paths:", possiblePaths);
    return []; // Returns an empty array instead of crashing the app
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data } = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  return data.map((row, index) => {
    const name = row.name || row.Hotel_Name || row.hotel_name || "Hotel Stay";
    const city = row.city || row.City || "India";
    const slug =
      row.slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    return {
      id: row.id || index + 1,
      slug,
      name,
      city,
      country: row.country || row.Country || "India",
      stars: Number(row.stars || row.Stars || row.star_rating || 4),
      rating: Number(row.rating || row.Rating || 4.2),
      reviews: Number(row.reviews || row.Reviews || row.review_count || 120),
      priceFrom: Number(row.priceFrom || row.price || row.Price || 2499),
      image:
        row.image || row.image_url || row.Image || "/images/hotels/hotel-1.jpg",
    };
  });
}
