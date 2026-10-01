"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { airports } from "@/data/flights";
import { addDaysISO, todayISO } from "@/utils/format";

const TABS = [
  { id: "flights", label: "Flights", icon: "✈" },
  { id: "hotels", label: "Hotels", icon: "🏨" },
  { id: "holidays", label: "Holidays", icon: "☀" },
  { id: "bus", label: "Bus", icon: "🚌" },
  { id: "visa", label: "Visa", icon: "✦" },
];

export default function BookingWidget({ initialTab = "flights" }) {
  const router = useRouter();
  const [tab, setTab] = useState(initialTab);
  const defaults = useMemo(
    () => ({
      tripType: "oneway",
      from: "BOM",
      to: "DEL",
      depart: addDaysISO(7),
      returnDate: addDaysISO(14),
      travellers: "1",
      cabin: "Economy",
      city: "Goa",
      checkIn: addDaysISO(10),
      checkOut: addDaysISO(13),
      guests: "2",
      rooms: "1",
      destination: "Kerala",
      theme: "Any",
      busFrom: "Nashik",
      busTo: "Mumbai",
      visaCountry: "United Arab Emirates",
    }),
    []
  );
  const [form, setForm] = useState(defaults);

  function update(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function search(event) {
    event.preventDefault();
    if (tab === "flights") {
      const params = new URLSearchParams({
        from: form.from,
        to: form.to,
        depart: form.depart,
        travellers: form.travellers,
        cabin: form.cabin,
        tripType: form.tripType,
      });
      if (form.tripType === "round") params.set("return", form.returnDate);
      router.push(`/flights/search?${params.toString()}`);
      return;
    }
    if (tab === "hotels") {
      const params = new URLSearchParams({
        city: form.city,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: form.guests,
        rooms: form.rooms,
      });
      router.push(`/hotels/search?${params.toString()}`);
      return;
    }
    if (tab === "holidays") {
      const params = new URLSearchParams({
        destination: form.destination,
        date: form.depart,
        travellers: form.travellers,
      });
      if (form.theme && form.theme !== "Any") params.set("theme", form.theme);
      router.push(`/holiday-packages?${params.toString()}`);
      return;
    }
    if (tab === "bus") {
      const params = new URLSearchParams({ from: form.busFrom, to: form.busTo, date: form.depart });
      router.push(`/bus/search?${params.toString()}`);
      return;
    }
    router.push(`/visa?q=${encodeURIComponent(form.visaCountry)}`);
  }

  return (
    <div className="booking-widget">
      <div className="booking-widget__tabs" role="tablist">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className={`booking-widget__tab${tab === item.id ? " is-active" : ""}`}
            onClick={() => setTab(item.id)}
          >
            <span aria-hidden="true">{item.icon}</span>
            <small>{item.label}</small>
          </button>
        ))}
      </div>

      <form onSubmit={search}>
        {tab === "flights" ? (
          <>
            <div className="trip-switch">
              <label>
                <input type="radio" name="tripType" value="oneway" checked={form.tripType === "oneway"} onChange={update} />
                One way
              </label>
              <label>
                <input type="radio" name="tripType" value="round" checked={form.tripType === "round"} onChange={update} />
                Round trip
              </label>
            </div>
            <div className="booking-widget__grid">
              <div className="field">
                <label htmlFor="from">From</label>
                <select id="from" name="from" value={form.from} onChange={update}>
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="to">To</label>
                <select id="to" name="to" value={form.to} onChange={update}>
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="depart">Depart</label>
                <input id="depart" type="date" name="depart" min={todayISO()} value={form.depart} onChange={update} />
              </div>
              {form.tripType === "round" ? (
                <div className="field">
                  <label htmlFor="returnDate">Return</label>
                  <input id="returnDate" type="date" name="returnDate" min={form.depart} value={form.returnDate} onChange={update} />
                </div>
              ) : (
                <div className="field">
                  <label htmlFor="cabin">Cabin</label>
                  <select id="cabin" name="cabin" value={form.cabin} onChange={update}>
                    <option>Economy</option>
                    <option>Premium Economy</option>
                    <option>Business</option>
                  </select>
                </div>
              )}
              <button className="btn btn--primary" type="submit">
                Search flights
              </button>
            </div>
          </>
        ) : null}

        {tab === "hotels" ? (
          <div className="booking-widget__grid">
            <div className="field">
              <label htmlFor="city">City / hotel</label>
              <input id="city" name="city" value={form.city} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="checkIn">Check-in</label>
              <input id="checkIn" type="date" name="checkIn" min={todayISO()} value={form.checkIn} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="checkOut">Check-out</label>
              <input id="checkOut" type="date" name="checkOut" min={form.checkIn} value={form.checkOut} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="rooms">Rooms & guests</label>
              <select id="rooms" name="rooms" value={form.rooms} onChange={update}>
                <option value="1">1 room</option>
                <option value="2">2 rooms</option>
                <option value="3">3 rooms</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="guests">Guests</label>
              <select id="guests" name="guests" value={form.guests} onChange={update}>
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
              </select>
            </div>
            <button className="btn btn--primary" type="submit">
              Search hotels
            </button>
          </div>
        ) : null}

        {tab === "holidays" ? (
          <div className="booking-widget__grid">
            <div className="field">
              <label htmlFor="destination">Destination</label>
              <input id="destination" name="destination" value={form.destination} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="holiday-date">Travel month</label>
              <input id="holiday-date" type="date" name="depart" min={todayISO()} value={form.depart} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="travellers">Travellers</label>
              <input id="travellers" name="travellers" type="number" min="1" value={form.travellers} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="holiday-notes">Theme</label>
              <select id="holiday-notes" name="theme" value={form.theme} onChange={update}>
                <option>Any</option>
                <option>Beach</option>
                <option>Nature</option>
                <option>Honeymoon</option>
                <option>City</option>
                <option>Mountain</option>
                <option>Family</option>
              </select>
            </div>
            <button className="btn btn--primary" type="submit">
              Find packages
            </button>
          </div>
        ) : null}

        {tab === "bus" ? (
          <div className="booking-widget__grid">
            <div className="field">
              <label htmlFor="busFrom">From</label>
              <input id="busFrom" name="busFrom" value={form.busFrom} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="busTo">To</label>
              <input id="busTo" name="busTo" value={form.busTo} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="bus-date">Date</label>
              <input id="bus-date" type="date" name="depart" min={todayISO()} value={form.depart} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="bus-seats">Seats</label>
              <input id="bus-seats" name="travellers" type="number" min="1" value={form.travellers} onChange={update} />
            </div>
            <button className="btn btn--primary" type="submit">
              Search buses
            </button>
          </div>
        ) : null}

        {tab === "visa" ? (
          <div className="booking-widget__grid">
            <div className="field">
              <label htmlFor="visaCountry">Country</label>
              <input id="visaCountry" name="visaCountry" value={form.visaCountry} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="visa-date">Travel date</label>
              <input id="visa-date" type="date" name="depart" min={todayISO()} value={form.depart} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="visa-travellers">Applicants</label>
              <input id="visa-travellers" name="travellers" type="number" min="1" value={form.travellers} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="nationality">Nationality</label>
              <input id="nationality" name="cabin" value="Indian" onChange={update} />
            </div>
            <button className="btn btn--primary" type="submit">
              Check visa
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
