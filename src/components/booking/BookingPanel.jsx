"use client";

import { useState } from "react";
import EnquiryForm from "@/components/common/EnquiryForm";
import { formatINR } from "@/utils/format";

export default function BookingPanel({
  type,
  details,
  date,
  onDate,
  adults,
  childrenCount,
  onAdults,
  onChildren,
  total,
  extraFields = [],
}) {
  const [editPax, setEditPax] = useState(false);
  const [ask, setAsk] = useState(false);

  return (
    <aside className="book-card">
      <h2>Booking Details</h2>
      <label className="book-card__box">
        <span>Select your date</span>
        <input type="date" value={date} onChange={(event) => onDate(event.target.value)} />
      </label>
      <div className="book-card__box">
        <span>Pax</span>
        <div className="book-card__pax">
          <strong>
            {adults} Adults, {childrenCount} Child
          </strong>
          <button type="button" onClick={() => setEditPax((prev) => !prev)}>
            Edit
          </button>
        </div>
        {editPax ? (
          <div className="book-card__edit">
            <select value={adults} onChange={(event) => onAdults(Number(event.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} Adults
                </option>
              ))}
            </select>
            <select value={childrenCount} onChange={(event) => onChildren(Number(event.target.value))}>
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} Child
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>
      <div className="book-card__total">
        <span>Total Amount:</span>
        <div>
          <strong>{formatINR(total)}</strong>
          <small>Per Person</small>
        </div>
      </div>
      {!ask ? (
        <button className="btn btn--primary btn--block book-card__cta" type="button" onClick={() => setAsk(true)}>
          Submit Your Inquiry
        </button>
      ) : (
        <EnquiryForm
          type={type}
          title=""
          submitLabel="Submit Your Inquiry"
          details={{ ...details, date, adults, children: childrenCount, total }}
          extraFields={extraFields}
        />
      )}
    </aside>
  );
}
