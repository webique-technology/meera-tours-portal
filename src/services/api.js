const DEFAULT_API = "/api";

function resolveBase() {
  const configured = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API;
  if (configured.startsWith("http")) {
    return configured.replace(/\/$/, "");
  }
  if (typeof window === "undefined") {
    const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return `${site}${configured.startsWith("/") ? configured : `/${configured}`}`;
  }
  return configured;
}

async function parseBody(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    return { success: false, message: text };
  }
}

export async function apiRequest(path, options = {}) {
  const url = `${resolveBase()}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };

  const fetchOptions = {
    ...options,
    headers,
  };
  if (!fetchOptions.cache && !fetchOptions.next) {
    fetchOptions.cache = "no-store";
  }

  const response = await fetch(url, fetchOptions);

  const payload = await parseBody(response);
  if (!response.ok || (payload && payload.success === false)) {
    const error = new Error(payload?.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

export function apiGet(path, query, options = {}) {
  const search = query
    ? `?${new URLSearchParams(
        Object.fromEntries(
          Object.entries(query).filter(([, value]) => value !== undefined && value !== "")
        )
      )}`
    : "";
  return apiRequest(`${path}${search}`, options);
}

export function apiPost(path, body) {
  return apiRequest(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
