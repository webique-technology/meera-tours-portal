"use client";

import { useMemo, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchStrip from "@/components/booking/SearchStrip";
import HotelResultCard from "@/components/cards/HotelResultCard";
import FilterSidebar, {
  FilterCheck,
  FilterDualRange,
  FilterGroup,
  FilterSearch,
  Pagination,
} from "@/components/filters/FilterSidebar";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchHotels } from "@/services/hotels";
import { countBy, normalizeHotel, paginate } from "@/utils/catalog";
import { filterHotels, sortList, toggleValue } from "@/utils/filters";
import {
  CurrencySelect,
  FormOptionSelect,
} from "@/components/common/ui/FormComponents";

const MEALS = [
  "Room Only",
  "Bed and Breakfast",
  "Half Board",
  "Full Board",
  "All Inclusive",
];
const PROPERTIES = [
  "Apartment",
  "Bed and Breakfast",
  "Cabin",
  "Chalet",
  "Cottage",
  "Guest House",
  "Homestay",
  "Hostel",
  "Hotel",
  "Lodge",
  "Private Vacation Home",
  "Resort",
  "Tent",
  "Villa",
];
const CANCELS = ["Non-Refundable", "Free Cancellation"];
const AMENITIES = [
  "24 Hour Power Supply",
  "24 Hour Front Desk",
  "24 Hour Reception",
  "24 Hour Security",
  "Wi-Fi",
  "Parking",
  "Restaurant",
  "Breakfast",
];
const SORTS = [
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "rating", label: "Guest rating" },
];

function HotelResults() {
  const params = useSearchParams();
  const city = params.get("city") || "";
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const guests = params.get("guests") || "2";
  const rooms = params.get("rooms") || "1";
  const { data, loading, error } = useFetch(
    () => fetchHotels({ city, q: city }),
    [city],
  );

  const catalog = useMemo(() => (data || []).map(normalizeHotel), [data]);
  const starCounts = useMemo(
    () => countBy(catalog, (item) => item.stars),
    [catalog],
  );
  const mealCounts = useMemo(
    () => countBy(catalog, (item) => item.mealType),
    [catalog],
  );
  const propertyCounts = useMemo(
    () => countBy(catalog, (item) => item.propertyType),
    [catalog],
  );
  const cancelCounts = useMemo(
    () => countBy(catalog, (item) => item.cancellation),
    [catalog],
  );
  const amenityCounts = useMemo(
    () =>
      AMENITIES.reduce((acc, name) => {
        acc[name] = catalog.filter((item) =>
          (item.amenities || []).some((amenity) =>
            amenity
              .toLowerCase()
              .includes(name.toLowerCase().replace("24 hour ", "")),
          ),
        ).length;
        return acc;
      }, {}),
    [catalog],
  );

  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("price-asc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [filters, setFilters] = useState({
    q: "",
    stars: [],
    mealTypes: [],
    propertyTypes: [],
    cancellations: [],
    amenities: [],
    minPrice: 0,
    maxPrice: 90000,
  });

  const results = useMemo(() => {
    const filtered = filterHotels(catalog, filters);
    return sortList(filtered, sort, {
      price: (item) => item.priceFrom,
      rating: (item) => item.rating,
    });
  }, [catalog, filters, sort]);

  const paged = useMemo(
    () => paginate(results, page, perPage),
    [results, page, perPage],
  );

  function clearFilters() {
    setFilters({
      q: "",
      stars: [],
      mealTypes: [],
      propertyTypes: [],
      cancellations: [],
      amenities: [],
      minPrice: 0,
      maxPrice: 90000,
    });
    setPage(1);
  }

  function patch(next) {
    setFilters((prev) => ({ ...prev, ...next }));
    setPage(1);
  }

  const placeLabel = city ? `${city}, India` : "your search";

  return (
    <>
      <SearchStrip
        mode="hotels"
        values={{ city, checkIn, checkOut, guests, rooms }}
      />
      <section className="section section--portal">
        <div className="container">
          {loading ? <LoadingState label="Searching hotels..." /> : null}
          {error ? <ErrorState message={error} /> : null}
          {!loading && !error ? (
            <div className="row">
              {/* top filter and heading row */}
              <div className="col-12">
                <div className="d-flex flex-column flex-md-row py-2 px-2 justify-content-center align-items-center gap-3 bg-white mb-3 rounded-4 shadow-sm">
                  <div className="flex-grow-1 flex-md-shrink-0 width-for-price-filter">
                    <div className="border-responsive-rb d-flex align-items-center gap-2">
                      <CurrencySelect
                        value="INR"
                        onChange={(value) => console.log(value)}
                        btnClass={"border rounded-4"}
                      />
                    </div>
                    <div className="d-block flerx-shrik-0 d-md-none">
                      <button
                        type="button"
                        className="btn btn--outline filter-open"
                        onClick={() => setOpen(true)}
                      >
                        Filters
                      </button>
                    </div>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <h3 className="fs-6 fs-lg-5 mb-0 lh-lg d-none d-md-block">
                      Showing {results.length} Properties in {placeLabel}
                    </h3>
                    <div className="price-filter d-flex justify-content-center align-items-center gap-0 gap-sm-3 gap-md-0">
                      <FormOptionSelect
                        label="Sort By:"
                        options={SORTS}
                        value={sort}
                        className="common-select-wrapper--width260"
                        btnClassName="bg-light"
                        onChange={(selectedVal) => {
                          setSort(selectedVal);
                          setPage(1);
                        }}
                      />
                      <div className="d-none d-md-block">
                        <button
                          type="button"
                          className="btn btn--outline filter-open"
                          onClick={() => setOpen(true)}
                        >
                          Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* left filter sidebar */}
              <div className="col-12 col-lg-3">
                <FilterSidebar
                  title="Filters"
                  onClear={clearFilters}
                  open={open}
                  onClose={() => setOpen(false)}
                >
                  <FilterGroup>
                    <FilterSearch
                      value={filters.q}
                      onChange={(q) => patch({ q })}
                      placeholder="location / hotel name"
                    />
                  </FilterGroup>
                  <FilterGroup title="Star Category">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <FilterCheck
                        key={star}
                        label={`${star} Star`}
                        count={starCounts[star] || 0}
                        checked={filters.stars.includes(star)}
                        onChange={() =>
                          patch({ stars: toggleValue(filters.stars, star) })
                        }
                      />
                    ))}
                  </FilterGroup>
                  <FilterGroup title="Meal Type">
                    {MEALS.map((name) => (
                      <FilterCheck
                        key={name}
                        label={name}
                        count={mealCounts[name] || 0}
                        checked={filters.mealTypes.includes(name)}
                        onChange={() =>
                          patch({
                            mealTypes: toggleValue(filters.mealTypes, name),
                          })
                        }
                      />
                    ))}
                  </FilterGroup>
                  <FilterGroup title="Property Type">
                    {PROPERTIES.map((name) => (
                      <FilterCheck
                        key={name}
                        label={name}
                        count={propertyCounts[name] || 0}
                        checked={filters.propertyTypes.includes(name)}
                        onChange={() =>
                          patch({
                            propertyTypes: toggleValue(
                              filters.propertyTypes,
                              name,
                            ),
                          })
                        }
                      />
                    ))}
                  </FilterGroup>
                  <FilterGroup title="Cancellation">
                    {CANCELS.map((name) => (
                      <FilterCheck
                        key={name}
                        label={name}
                        count={cancelCounts[name] || 0}
                        checked={filters.cancellations.includes(name)}
                        onChange={() =>
                          patch({
                            cancellations: toggleValue(
                              filters.cancellations,
                              name,
                            ),
                          })
                        }
                      />
                    ))}
                  </FilterGroup>
                  <FilterGroup
                    title="Price Range"
                    onReset={() => patch({ minPrice: 0, maxPrice: 90000 })}
                  >
                    <FilterDualRange
                      min={0}
                      max={90000}
                      minValue={filters.minPrice}
                      maxValue={filters.maxPrice}
                      step={500}
                      onMin={(minPrice) => patch({ minPrice })}
                      onMax={(maxPrice) => patch({ maxPrice })}
                    />
                  </FilterGroup>
                  <FilterGroup title="Amenities">
                    {AMENITIES.map((name) => (
                      <FilterCheck
                        key={name}
                        label={name}
                        count={amenityCounts[name] || 0}
                        checked={filters.amenities.includes(name)}
                        onChange={() =>
                          patch({
                            amenities: toggleValue(filters.amenities, name),
                          })
                        }
                      />
                    ))}
                  </FilterGroup>
                </FilterSidebar>
              </div>

              {/* for display search cards data*/}
              <div className="col-12 col-lg-9">
                {!results.length ? (
                  <EmptyState message="No hotels match these filters. Clear filters or try Goa, Kullu, Manali or Dubai." />
                ) : (
                  <div className="row g-4">
                    {paged.items.map((item) => (
                      <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                        <HotelResultCard
                          item={item}
                          checkIn={checkIn}
                          checkOut={checkOut}
                        />
                      </div>
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

export default function HotelSearchPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading search..." />}>
      <HotelResults />
    </Suspense>
  );
}

{
  /* <div className="result-layout"></div> */
}
