const AMENITY_ALIASES = {
  "Wi-Fi": ["wifi", "wi-fi"],
  Pool: ["pool"],
  Spa: ["spa"],
  Parking: ["parking"],
  Restaurant: ["restaurant"],
  Breakfast: ["breakfast"],
  Beach: ["beach", "sea view"],
  Gym: ["gym", "fitness"],
  AC: ["ac seater", "ac sleeper", "ac"],
  Blanket: ["blanket"],
  "Charging point": ["charging"],
  "Wi-Fi bus": ["wi-fi", "wifi"],
  "24 Hour Power Supply": ["24 hour power", "power supply"],
  "24 Hour Front Desk": ["front desk", "reception"],
  "24 Hour Reception": ["reception", "front desk"],
  "24 Hour Security": ["security"],
};

export function hasAmenity(item, label) {
  const hay = `${(item.amenities || []).join(" ")} ${item.type || ""}`.toLowerCase();
  const aliases = AMENITY_ALIASES[label] || [label.toLowerCase()];
  return aliases.some((alias) => hay.includes(alias));
}

export function departHour(time) {
  const [hours] = String(time || "00:00").split(":").map(Number);
  return hours;
}

export function departSlot(time) {
  const hour = departHour(time);
  if (hour < 6) return "early";
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

export function durationNightsBucket(nights) {
  if (nights <= 3) return "short";
  if (nights <= 6) return "mid";
  return "long";
}

export function sortList(list, sort, getters) {
  const copy = [...list];
  const { price, rating, duration, depart, arrive, seats } = getters;
  copy.sort((a, b) => {
    if (sort === "price-asc" || sort === "fare") return price(a) - price(b);
    if (sort === "price-desc") return price(b) - price(a);
    if (sort === "rating" && rating) return rating(b) - rating(a);
    if (sort === "duration" && duration) return duration(a) - duration(b);
    if (sort === "depart" && depart) return depart(a) - depart(b);
    if (sort === "arrive" && arrive) return arrive(a) - arrive(b);
    if (sort === "seats" && seats) return seats(b) - seats(a);
    return 0;
  });
  return copy;
}

export function durationMinutes(label) {
  const match = String(label || "").match(/(\d+)h\s*(\d+)?/);
  if (!match) return 0;
  return Number(match[1]) * 60 + Number(match[2] || 0);
}

export function timeValue(time) {
  return Number(String(time || "00:00").replace(":", ""));
}

export function filterHotels(list, filters) {
  const query = String(filters.q || "").trim().toLowerCase();
  return list.filter((item) => {
    if (query && !`${item.name} ${item.city}`.toLowerCase().includes(query)) return false;
    if (filters.stars?.length && !filters.stars.includes(item.stars)) return false;
    if (filters.mealTypes?.length && !filters.mealTypes.includes(item.mealType)) return false;
    if (filters.propertyTypes?.length && !filters.propertyTypes.includes(item.propertyType)) return false;
    if (filters.cancellations?.length && !filters.cancellations.includes(item.cancellation)) return false;
    if (filters.minRating && item.rating < filters.minRating) return false;
    if (item.priceFrom < filters.minPrice || item.priceFrom > filters.maxPrice) return false;
    if (filters.amenities?.length && !filters.amenities.every((name) => hasAmenity(item, name))) {
      return false;
    }
    return true;
  });
}

export function filterPackages(list, filters) {
  return list.filter((item) => {
    if (filters.destinations?.length && !filters.destinations.includes(item.destination)) return false;
    if (filters.themes?.length && !filters.themes.includes(item.theme)) return false;
    if (filters.durations?.length && !filters.durations.includes(durationNightsBucket(item.nights))) {
      return false;
    }
    if (item.price < filters.minPrice || item.price > filters.maxPrice) return false;
    return true;
  });
}

export function filterBuses(list, filters) {
  return list.filter((item) => {
    if (filters.slots?.length && !filters.slots.includes(departSlot(item.departTime))) return false;
    if (filters.arriveSlots?.length && !filters.arriveSlots.includes(departSlot(item.arriveTime))) return false;
    if (filters.seatTypes?.length && !filters.seatTypes.includes(item.seatType)) return false;
    if (filters.acTypes?.length && !filters.acTypes.includes(item.ac)) return false;
    if (filters.types?.length && !filters.types.includes(item.type)) return false;
    if (filters.operators?.length && !filters.operators.includes(item.operator)) return false;
    if (filters.boarding?.length && !filters.boarding.some((stop) => (item.boarding || []).includes(stop))) {
      return false;
    }
    if (filters.dropping?.length && !filters.dropping.some((stop) => (item.dropping || []).includes(stop))) {
      return false;
    }
    if (item.price < filters.minPrice || item.price > filters.maxPrice) return false;
    if (filters.amenities?.length && !filters.amenities.every((name) => hasAmenity(item, name))) {
      return false;
    }
    return true;
  });
}

export function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}
