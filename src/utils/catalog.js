const DROP_MAP = {
  Mumbai: ["Dadar", "Borivali", "Andheri", "Bandra"],
  Pune: ["Swargate", "Shivajinagar", "Wakad"],
  Goa: ["Panjim", "Mapusa", "Madgaon"],
  Manali: ["Mall Road", "Manali Bus Stand"],
  Shirdi: ["Temple Gate", "Bus Stand"],
  Nashik: ["CBS", "Mumbai Naka"],
};

export function mealTypeOf(hotel) {
  if (hotel.mealType) return hotel.mealType;
  const hay = (hotel.amenities || []).join(" ").toLowerCase();
  if (hay.includes("all inclusive") || hay.includes("all-inclusive")) return "All Inclusive";
  if (hay.includes("full board")) return "Full Board";
  if (hay.includes("half board")) return "Half Board";
  if (hay.includes("breakfast")) return "Bed and Breakfast";
  return "Room Only";
}

export function propertyTypeOf(hotel) {
  if (hotel.propertyType) return hotel.propertyType;
  const name = String(hotel.name || "").toLowerCase();
  if (name.includes("resort")) return "Resort";
  if (name.includes("villa")) return "Villa";
  if (name.includes("guest")) return "Guest House";
  if (name.includes("lodge")) return "Lodge";
  if (name.includes("cottage")) return "Cottage";
  if (name.includes("homestay") || name.includes("home stay")) return "Homestay";
  if (name.includes("hostel")) return "Hostel";
  return "Hotel";
}

export function cancellationOf(hotel) {
  return hotel.cancellation || (hotel.stars >= 4 ? "Free Cancellation" : "Non-Refundable");
}

export function seatTypeOf(bus) {
  if (bus.seatType) return bus.seatType;
  return /sleeper/i.test(bus.type) ? "Sleeper" : "Seater";
}

export function acOf(bus) {
  if (bus.ac) return bus.ac;
  return /non-ac|non ac/i.test(bus.type) ? "Non-AC" : "AC";
}

export function droppingOf(bus) {
  if (bus.dropping?.length) return bus.dropping;
  return DROP_MAP[bus.to] || [`${bus.to} Bus Stand`];
}

const ROOM_GALLERY = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
];

export function normalizeHotel(hotel) {
  const amenities = [...(hotel.amenities || [])];
  if (hotel.stars >= 4 && !amenities.some((item) => /front desk|reception/i.test(item))) {
    amenities.push("24 Hour Front Desk");
  }
  if (hotel.stars >= 5 && !amenities.some((item) => /security/i.test(item))) {
    amenities.push("24 Hour Security");
  }
  const gallery = hotel.gallery?.length ? hotel.gallery : ROOM_GALLERY;
  return {
    ...hotel,
    amenities,
    gallery,
    mealType: mealTypeOf(hotel),
    propertyType: propertyTypeOf(hotel),
    cancellation: cancellationOf(hotel),
  };
}

export function normalizeBus(bus) {
  return {
    ...bus,
    seatType: seatTypeOf(bus),
    ac: acOf(bus),
    dropping: droppingOf(bus),
  };
}

export function packageGallery(pack) {
  if (pack.gallery?.length) return [...pack.gallery, ...ROOM_GALLERY].slice(0, 9);
  return [pack.image, ...ROOM_GALLERY].slice(0, 9);
}

export function packageHotel(pack) {
  if (pack.hotel) return pack.hotel;
  return {
    name: `${pack.destination} Stay`,
    city: `${pack.destination}, ${pack.country}`,
    stars: 4,
    roomType: "Standard",
    mealPlan: "Breakfast",
    inclusion: "Hotel with breakfast",
  };
}

export function countBy(list, getter) {
  return list.reduce((acc, item) => {
    const key = getter(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

export function paginate(list, page, perPage) {
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / perPage) || 1);
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * perPage;
  return { items: list.slice(start, start + perPage), page: current, pages, total, perPage };
}
