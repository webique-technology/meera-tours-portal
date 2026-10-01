import { apiGet } from "./api";

export function fetchVisaServices(query) {
  return apiGet("/visa", query);
}

export function fetchVisaBySlug(slug) {
  return apiGet(`/visa/${encodeURIComponent(slug)}`);
}
