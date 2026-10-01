import PackageDetailClient from "./PackageDetailClient";

export default async function PackageDetailPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { slug } = resolvedParams;

  return <PackageDetailClient slug={slug} searchParams={resolvedSearchParams} />;
}
