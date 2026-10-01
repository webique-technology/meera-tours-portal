"use client";

import { useMemo, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchStrip from "@/components/booking/SearchStrip";
import BusCard from "@/components/cards/BusCard";
import FilterSidebar, {
  FilterCheck,
  FilterDualRange,
  FilterGroup,
  Pagination,
  SearchSteps,
  SortTabs,
} from "@/components/filters/FilterSidebar";
import { EmptyState, ErrorState, LoadingState } from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchBuses } from "@/services/buses";
import { countBy, normalizeBus, paginate } from "@/utils/catalog";
import { durationMinutes, filterBuses, sortList, timeValue, toggleValue } from "@/utils/filters";

const SLOTS = [
  { value: "early", label: "Before 6 AM" },
  { value: "morning", label: "6 AM – 12 PM" },
  { value: "afternoon", label: "12 PM – 6 PM" },
  { value: "evening", label: "After 6 PM" },
];
const SORTS = [
  { value: "depart", label: "Departure" },
  { value: "duration", label: "Duration" },
  { value: "arrive", label: "Arrival" },
  { value: "fare", label: "Fare" },
  { value: "seats", label: "Seats available" },
];

function BusResults() {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const date = params.get("date") || "";
  const { data, loading, error } = useFetch(() => fetchBuses({ from, to }), [from, to]);

  const catalog = useMemo(() => (data || []).map(normalizeBus), [data]);
  const operators = useMemo(() => [...new Set(catalog.map((item) => item.operator))], [catalog]);
  const boarding = useMemo(() => [...new Set(catalog.flatMap((item) => item.boarding || []))], [catalog]);
  const dropping = useMemo(() => [...new Set(catalog.flatMap((item) => item.dropping || []))], [catalog]);
  const operatorCounts = useMemo(() => countBy(catalog, (item) => item.operator), [catalog]);

  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("depart");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [moreBoard, setMoreBoard] = useState(false);
  const [moreDrop, setMoreDrop] = useState(false);
  const [moreOps, setMoreOps] = useState(false);
  const [filters, setFilters] = useState({
    slots: [],
    arriveSlots: [],
    seatTypes: [],
    acTypes: [],
    operators: [],
    boarding: [],
    dropping: [],
    minPrice: 0,
    maxPrice: 3000,
  });

  const results = useMemo(() => {
    const filtered = filterBuses(catalog, filters);
    return sortList(filtered, sort, {
      price: (item) => item.price,
      duration: (item) => durationMinutes(item.duration),
      depart: (item) => timeValue(item.departTime),
      arrive: (item) => timeValue(item.arriveTime),
      seats: (item) => item.seats,
    });
  }, [catalog, filters, sort]);

  const paged = useMemo(() => paginate(results, page, perPage), [results, page, perPage]);

  function clearFilters() {
    setFilters({
      slots: [],
      arriveSlots: [],
      seatTypes: [],
      acTypes: [],
      operators: [],
      boarding: [],
      dropping: [],
      minPrice: 0,
      maxPrice: 3000,
    });
    setPage(1);
  }

  function patch(next) {
    setFilters((prev) => ({ ...prev, ...next }));
    setPage(1);
  }

  return (
    <>
      <SearchStrip mode="bus" values={{ from, to, date }} />
      <section className="section section--portal">
        <div className="container">
          <SearchSteps steps={["Search route", "Filter buses", "Select seat"]} active={2} />
          {loading ? <LoadingState label="Searching buses..." /> : null}
          {error ? <ErrorState message={error} /> : null}
          {!loading && !error ? (
            <div className="result-layout">
              <FilterSidebar title="Filters" onClear={clearFilters} open={open} onClose={() => setOpen(false)}>
                <FilterGroup title="Price range">
                  <FilterDualRange
                    min={0}
                    max={3000}
                    minValue={filters.minPrice}
                    maxValue={filters.maxPrice}
                    step={50}
                    onMin={(minPrice) => patch({ minPrice })}
                    onMax={(maxPrice) => patch({ maxPrice })}
                  />
                </FilterGroup>
                <FilterGroup title="Departure">
                  {SLOTS.map((item) => (
                    <FilterCheck
                      key={item.value}
                      label={item.label}
                      checked={filters.slots.includes(item.value)}
                      onChange={() => patch({ slots: toggleValue(filters.slots, item.value) })}
                    />
                  ))}
                </FilterGroup>
                <FilterGroup title="Arrival time">
                  {SLOTS.map((item) => (
                    <FilterCheck
                      key={`arr-${item.value}`}
                      label={item.label}
                      checked={filters.arriveSlots.includes(item.value)}
                      onChange={() => patch({ arriveSlots: toggleValue(filters.arriveSlots, item.value) })}
                    />
                  ))}
                </FilterGroup>
                <FilterGroup title="Seat type">
                  {["Sleeper", "Seater"].map((name) => (
                    <FilterCheck
                      key={name}
                      label={name}
                      checked={filters.seatTypes.includes(name)}
                      onChange={() => patch({ seatTypes: toggleValue(filters.seatTypes, name) })}
                    />
                  ))}
                </FilterGroup>
                <FilterGroup title="AC / Non-AC">
                  {["AC", "Non-AC"].map((name) => (
                    <FilterCheck
                      key={name}
                      label={name}
                      checked={filters.acTypes.includes(name)}
                      onChange={() => patch({ acTypes: toggleValue(filters.acTypes, name) })}
                    />
                  ))}
                </FilterGroup>
                <FilterGroup title="Boarding point">
                  {(moreBoard ? boarding : boarding.slice(0, 4)).map((name) => (
                    <FilterCheck
                      key={name}
                      label={name}
                      checked={filters.boarding.includes(name)}
                      onChange={() => patch({ boarding: toggleValue(filters.boarding, name) })}
                    />
                  ))}
                  {boarding.length > 4 ? (
                    <button type="button" className="filter-clear" onClick={() => setMoreBoard((prev) => !prev)}>
                      {moreBoard ? "Show less" : "Show more"}
                    </button>
                  ) : null}
                </FilterGroup>
                <FilterGroup title="Dropping point">
                  {(moreDrop ? dropping : dropping.slice(0, 4)).map((name) => (
                    <FilterCheck
                      key={name}
                      label={name}
                      checked={filters.dropping.includes(name)}
                      onChange={() => patch({ dropping: toggleValue(filters.dropping, name) })}
                    />
                  ))}
                  {dropping.length > 4 ? (
                    <button type="button" className="filter-clear" onClick={() => setMoreDrop((prev) => !prev)}>
                      {moreDrop ? "Show less" : "Show more"}
                    </button>
                  ) : null}
                </FilterGroup>
                <FilterGroup title="Bus operator">
                  {(moreOps ? operators : operators.slice(0, 4)).map((name) => (
                    <FilterCheck
                      key={name}
                      label={name}
                      count={operatorCounts[name]}
                      checked={filters.operators.includes(name)}
                      onChange={() => patch({ operators: toggleValue(filters.operators, name) })}
                    />
                  ))}
                  {operators.length > 4 ? (
                    <button type="button" className="filter-clear" onClick={() => setMoreOps((prev) => !prev)}>
                      {moreOps ? "Show less" : "Show more"}
                    </button>
                  ) : null}
                </FilterGroup>
              </FilterSidebar>
              <div>
                <div className="bus-toolbar">
                  <strong>Total {results.length} buses found</strong>
                  <button type="button" className="btn btn--outline filter-open" onClick={() => setOpen(true)}>
                    Filters
                  </button>
                </div>
                <SortTabs
                  value={sort}
                  onChange={(value) => {
                    setSort(value);
                    setPage(1);
                  }}
                  options={SORTS}
                />
                {!results.length ? (
                  <EmptyState message="No buses match these filters. Try Nashik–Mumbai or clear filters." />
                ) : (
                  <div className="grid" style={{ gap: "0.8rem" }}>
                    {paged.items.map((item) => (
                      <BusCard key={item.id} item={item} travelDate={date} />
                    ))}
                  </div>
                )}
                {results.length ? (
                  <Pagination
                    page={paged.page}
                    pages={paged.pages}
                    total={paged.total}
                    perPage={perPage}
                    onPage={setPage}
                    onPerPage={(size) => {
                      setPerPage(size);
                      setPage(1);
                    }}
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default function BusSearchPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading search..." />}>
      <BusResults />
    </Suspense>
  );
}
