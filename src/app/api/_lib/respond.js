import { NextResponse } from "next/server";

export function ok(data, message = "OK") {
  return NextResponse.json({ success: true, message, data });
}

export function fail(message, status = 400, extra = null) {
  return NextResponse.json({ success: false, message, data: extra }, { status });
}

export function getQuery(request) {
  const { searchParams } = new URL(request.url);
  return Object.fromEntries(searchParams.entries());
}

export function includesText(value, query) {
  if (!query) return true;
  return String(value || "").toLowerCase().includes(String(query).toLowerCase());
}
