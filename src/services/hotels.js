import { apiGet } from "./api";

export function fetchHotels(query) {
  return apiGet("/hotels", query);
}

export function fetchHotelBySlug(slug) {
  return apiGet(`/hotels/${encodeURIComponent(slug)}`);
}
