"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import BookingWidget from "@/components/booking/BookingWidget";
import PackageCard from "@/components/cards/PackageCard";
import FilterSidebar, {
  FilterCheck,
  FilterGroup,
  FilterRange,
  ResultsToolbar,
  SearchSteps,
} from "@/components/filters/FilterSidebar";
import { EmptyState, ErrorState, LoadingState } from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchPackages } from "@/services/packages";
import { filterPackages, sortList, toggleValue } from "@/utils/filters";

const THEMES = ["Beach", "Nature", "Honeymoon", "City", "Mountain", "Family"];
const DURATIONS = [
  { value: "short", label: "1–3 nights" },
  { value: "mid", label: "4–6 nights" },
  { value: "long", label: "7+ nights" },
];
const SORTS = [
  { value: "popular", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "duration", label: "Duration" },
];

function PackageList() {
  const params = useSearchParams();
  const destination = params.get("destination") || "";
  const theme = params.get("theme") || "";
  const { data, loading, error } = useFetch(() => fetchPackages(), []);

  const destinations = useMemo(
    () => [...new Set((data || []).map((item) => item.destination))],
    [data]
  );

  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("popular");
  const [filters, setFilters] = useState({
    destinations: destination ? [destination] : [],
    themes: theme ? [theme] : [],
    durations: [],
    minPrice: 0,
    maxPrice: 90000,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      destinations: destination ? [destination] : [],
      themes: theme ? [theme] : [],
    }));
  }, [destination, theme]);

  const results = useMemo(() => {
    const filtered = filterPackages(data || [], filters);
    return sortList(filtered, sort, {
      price: (item) => item.price,
      duration: (item) => item.nights,
      rating: (item) => item.rating,
    });
  }, [data, filters, sort]);

  function clearFilters() {
    setFilters({ destinations: [], themes: [], durations: [], minPrice: 0, maxPrice: 90000 });
  }

  return (
    <section className="section">
      <div className="container">
        <SearchSteps steps={["Choose destination", "Filter packages", "Enquire"]} active={2} />
        <div className="eyebrow">Holiday packages</div>
        <h1>{destination ? `${destination} holidays` : "Holiday packages"}</h1>
        <p className="lead">Filter by destination, theme, duration and budget — same booking-portal flow.</p>
        <div style={{ margin: "1.4rem 0 2rem" }}>
          <BookingWidget initialTab="holidays" />
        </div>
        {loading ? <LoadingState label="Loading packages..." /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error ? (
          <div className="result-layout">
            <FilterSidebar title="Holiday filters" onClear={clearFilters} open={open} onClose={() => setOpen(false)}>
              <FilterGroup title="Price per person">
                <FilterRange min={0} max={90000} value={filters.maxPrice} onChange={(maxPrice) => setFilters((prev) => ({ ...prev, maxPrice }))} />
              </FilterGroup>
              <FilterGroup title="Destination">
                {destinations.map((name) => (
                  <FilterCheck
                    key={name}
                    label={name}
                    checked={filters.destinations.includes(name)}
                    onChange={() => setFilters((prev) => ({ ...prev, destinations: toggleValue(prev.destinations, name) }))}
                  />
                ))}
              </FilterGroup>
              <FilterGroup title="Theme">
                {THEMES.map((name) => (
                  <FilterCheck
                    key={name}
                    label={name}
                    checked={filters.themes.includes(name)}
                    onChange={() => setFilters((prev) => ({ ...prev, themes: toggleValue(prev.themes, name) }))}
                  />
                ))}
              </FilterGroup>
              <FilterGroup title="Duration">
                {DURATIONS.map((item) => (
                  <FilterCheck
                    key={item.value}
                    label={item.label}
                    checked={filters.durations.includes(item.value)}
                    onChange={() => setFilters((prev) => ({ ...prev, durations: toggleValue(prev.durations, item.value) }))}
                  />
                ))}
              </FilterGroup>
            </FilterSidebar>
            <div>
              <ResultsToolbar
                count={results.length}
                noun="package"
                sort={sort}
                onSort={setSort}
                options={SORTS}
                onOpenFilters={() => setOpen(true)}
              />
              {!results.length ? (
                <EmptyState message="No packages match these filters. Try Goa, Kerala, Dubai or Maldives." />
              ) : (
                <div className="grid grid--2">
                  {results.map((item) => (
                    <PackageCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function HolidayPackagesPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading holidays..." />}>
      <PackageList />
    </Suspense>
  );
}
