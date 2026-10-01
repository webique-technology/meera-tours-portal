import { apiGet } from "./api";

export function fetchBuses(query) {
  return apiGet("/buses", query);
}

export function fetchBusById(id) {
  return apiGet(`/buses/${encodeURIComponent(id)}`);
}
