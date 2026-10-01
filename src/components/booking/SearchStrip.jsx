"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { todayISO } from "@/utils/format";
import { MapPin, Calendar, Users, Search, Bus, ChevronDown } from "lucide-react";

const COMBO_OPTIONS = [
  { value: "1-1", label: "1 Room, 1 Guest" },
  { value: "1-2", label: "1 Room, 2 Guests" },
  { value: "1-3", label: "1 Room, 3 Guests" },
  { value: "2-4", label: "2 Rooms, 4 Guests" },
  { value: "3-6", label: "3 Rooms, 6 Guests" },
];

export default function SearchStrip({ mode = "hotels", values = {} }) {
  const router = useRouter();
  const [form, setForm] = useState(values);
  const [isComboOpen, setIsComboOpen] = useState(false);
  const comboRef = useRef(null);

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const dateRef = useRef(null);

  // Close custom dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (comboRef.current && !comboRef.current.contains(e.target)) {
        setIsComboOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function update(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleDateClick(ref) {
    if (ref.current) {
      if (typeof ref.current.showPicker === "function") {
        ref.current.showPicker();
      } else {
        ref.current.focus();
      }
    }
  }

  function submit(event) {
    event.preventDefault();
    if (mode === "hotels") {
      const params = new URLSearchParams({
        city: form.city || "",
        checkIn: form.checkIn || "",
        checkOut: form.checkOut || "",
        guests: form.guests || "2",
        rooms: form.rooms || "1",
      });
      router.push(`/hotels/search?${params.toString()}`);
      return;
    }

    const params = new URLSearchParams({
      from: form.from || "",
      to: form.to || "",
      date: form.date || "",
    });
    router.push(`/bus/search?${params.toString()}`);
  }

  const currentComboKey = `${form.rooms || "1"}-${form.guests || "2"}`;
  const currentComboLabel =
    COMBO_OPTIONS.find((opt) => opt.value === currentComboKey)?.label ||
    "1 Room, 2 Guests";

  return (
    <div className={`search-strip search-strip--${mode}`}>
      <Container>
        <Form onSubmit={submit} className="search-strip__bar">
          <Row className="g-2 g-lg-0 align-items-center w-100 m-0">
            {mode === "hotels" ? (
              <>
                {/* City / Airport */}
                <Col xs={12} sm={6} lg={3} className="p-1">
                  <div className="search-card">
                    <Form.Label className="search-card__label">
                      CITY / AIRPORT NAME
                    </Form.Label>
                    <div className="search-card__input-wrap">
                      <MapPin size={17} className="search-card__icon" />
                      <Form.Control
                        type="text"
                        name="city"
                        placeholder="Goa"
                        value={form.city || ""}
                        onChange={update}
                        required
                        className="search-card__input"
                      />
                    </div>
                  </div>
                </Col>

                {/* Check In */}
                <Col xs={6} sm={6} lg={2} className="p-1">
                  <div
                    className="search-card cursor-pointer"
                    onClick={() => handleDateClick(checkInRef)}
                  >
                    <Form.Label className="search-card__label cursor-pointer">
                      CHECK IN
                    </Form.Label>
                    <div className="search-card__input-wrap">
                      <Calendar size={17} className="search-card__icon" />
                      <Form.Control
                        ref={checkInRef}
                        type="date"
                        name="checkIn"
                        min={todayISO()}
                        value={form.checkIn || ""}
                        onChange={update}
                        required
                        className="search-card__input search-card__date"
                      />
                    </div>
                  </div>
                </Col>

                {/* Check Out */}
                <Col xs={6} sm={6} lg={2} className="p-1">
                  <div
                    className="search-card cursor-pointer"
                    onClick={() => handleDateClick(checkOutRef)}
                  >
                    <Form.Label className="search-card__label cursor-pointer">
                      CHECK OUT
                    </Form.Label>
                    <div className="search-card__input-wrap">
                      <Calendar size={17} className="search-card__icon" />
                      <Form.Control
                        ref={checkOutRef}
                        type="date"
                        name="checkOut"
                        min={form.checkIn || todayISO()}
                        value={form.checkOut || ""}
                        onChange={update}
                        required
                        className="search-card__input search-card__date"
                      />
                    </div>
                  </div>
                </Col>

                {/* Rooms & Guests Custom Select */}
                <Col xs={12} sm={6} lg={3} className="p-1">
                  <div
                    ref={comboRef}
                    className="search-card position-relative cursor-pointer"
                    onClick={() => setIsComboOpen((prev) => !prev)}
                  >
                    <Form.Label className="search-card__label cursor-pointer">
                      ROOMS & GUESTS
                    </Form.Label>
                    <div className="search-card__input-wrap justify-content-between">
                      <div className="d-flex align-items-center gap-2 text-truncate">
                        <Users size={17} className="search-card__icon" />
                        <span className="search-card__custom-val">
                          {currentComboLabel}
                        </span>
                      </div>
                      <ChevronDown
                        size={15}
                        className={`text-muted transition-transform ${
                          isComboOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {isComboOpen && (
                      <ul className="search-dropdown-menu list-unstyled position-absolute start-0 top-100 w-100 bg-white rounded-3 shadow-lg border m-0 p-1 z-3">
                        {COMBO_OPTIONS.map((opt) => {
                          const [r, g] = opt.value.split("-");
                          const isSelected = opt.value === currentComboKey;

                          return (
                            <li key={opt.value}>
                              <button
                                type="button"
                                className={`search-dropdown-item w-100 text-start px-3 py-2 border-0 rounded-2 bg-transparent ${
                                  isSelected ? "is-selected fw-semibold bg-light" : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setForm((prev) => ({
                                    ...prev,
                                    rooms: r,
                                    guests: g,
                                  }));
                                  setIsComboOpen(false);
                                }}
                              >
                                {opt.label}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </Col>
              </>
            ) : (
              <>
                {/* Bus Departure */}
                <Col xs={12} sm={6} lg={4} className="p-1">
                  <div className="search-card">
                    <Form.Label className="search-card__label">FROM</Form.Label>
                    <div className="search-card__input-wrap">
                      <Bus size={17} className="search-card__icon" />
                      <Form.Control
                        type="text"
                        name="from"
                        placeholder="Departure City"
                        value={form.from || ""}
                        onChange={update}
                        required
                        className="search-card__input"
                      />
                    </div>
                  </div>
                </Col>

                {/* Bus Destination */}
                <Col xs={12} sm={6} lg={3} className="p-1">
                  <div className="search-card">
                    <Form.Label className="search-card__label">TO</Form.Label>
                    <div className="search-card__input-wrap">
                      <MapPin size={17} className="search-card__icon" />
                      <Form.Control
                        type="text"
                        name="to"
                        placeholder="Destination City"
                        value={form.to || ""}
                        onChange={update}
                        required
                        className="search-card__input"
                      />
                    </div>
                  </div>
                </Col>

                {/* Bus Date */}
                <Col xs={12} sm={6} lg={3} className="p-1">
                  <div
                    className="search-card cursor-pointer"
                    onClick={() => handleDateClick(dateRef)}
                  >
                    <Form.Label className="search-card__label cursor-pointer">
                      JOURNEY DATE
                    </Form.Label>
                    <div className="search-card__input-wrap">
                      <Calendar size={17} className="search-card__icon" />
                      <Form.Control
                        ref={dateRef}
                        type="date"
                        name="date"
                        min={todayISO()}
                        value={form.date || ""}
                        onChange={update}
                        required
                        className="search-card__input search-card__date"
                      />
                    </div>
                  </div>
                </Col>
              </>
            )}

            {/* Submit Button */}
            <Col xs={12} lg={2} className="p-1">
              <Button
                type="submit"
                className="search-strip__btn w-100 d-flex align-items-center justify-content-center gap-2"
              >
                <Search size={19} className="text-warning" strokeWidth={2.5} />
                <span>Search</span>
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}