import { apiGet, apiPost } from "./api";

export function fetchDestinations() {
  return apiGet("/destinations");
}

export function fetchOffers() {
  return apiGet("/offers");
}

export function fetchBanners() {
  return apiGet("/banners");
}

export function fetchTestimonials() {
  return apiGet("/testimonials");
}

export function fetchSite() {
  return apiGet("/site");
}

export function submitEnquiry(payload) {
  return apiPost("/enquiries", payload);
}

export function submitContact(payload) {
  return apiPost("/contact", payload);
}
