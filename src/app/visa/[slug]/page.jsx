import VisaDetailClient from "./VisaDetailClient";

export default async function VisaDetailPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { slug } = resolvedParams;

  return <VisaDetailClient slug={slug} searchParams={resolvedSearchParams} />;
}
