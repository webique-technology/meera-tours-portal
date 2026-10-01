import HotelDetailClient from "./HotelDetailClient";

export default async function HotelDetailPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { slug } = resolvedParams;

  return <HotelDetailClient slug={slug} searchParams={resolvedSearchParams} />;
}
