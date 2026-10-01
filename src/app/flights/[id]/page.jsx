import FlightDetailClient from "./FlightDetailClient";

export default async function FlightDetailPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { id } = resolvedParams;

  return <FlightDetailClient id={id} searchParams={resolvedSearchParams} />;
}
