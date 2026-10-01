import { apiGet } from "./api";

export function fetchPackages(query) {
  return apiGet("/packages", query);
}

export function fetchPackageBySlug(slug) {
  return apiGet(`/packages/${encodeURIComponent(slug)}`);
}
