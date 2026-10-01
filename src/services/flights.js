import { apiGet } from "./api";

export function fetchFlights(query) {
  return apiGet("/flights", query);
}

export function fetchFlightById(id) {
  return apiGet(`/flights/${encodeURIComponent(id)}`);
}

export function fetchAirports() {
  return apiGet("/flights/airports");
}
