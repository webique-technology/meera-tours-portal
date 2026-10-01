"use client";

import { useState } from "react";
import EnquiryForm from "@/components/common/EnquiryForm";
import { formatDate, formatINR } from "@/utils/format";

export default function BusCard({ item, travelDate }) {
  const [open, setOpen] = useState("");

  return (
    <article className="bus-ticket">
      <div className="bus-ticket__grid">
        <div>
          <strong className="bus-ticket__op">{item.operator}</strong>
          <p>{item.type}</p>
          <small>{item.seats} Seats Available</small>
          <div className="chip-row">
            <span className="chip">{item.ac}</span>
            <span className="chip">{item.seatType}</span>
          </div>
        </div>
        <div className="bus-ticket__times">
          <div className="time-block">
            <strong>{item.departTime}</strong>
            <span>{item.from}</span>
            <small>{travelDate ? formatDate(travelDate) : ""}</small>
          </div>
          <div className="bus-ticket__dur">
            <div className="route-line" />
            <small>{item.duration}</small>
          </div>
          <div className="time-block">
            <strong>{item.arriveTime}</strong>
            <span>{item.to}</span>
            <small>{travelDate ? formatDate(travelDate) : ""}</small>
          </div>
        </div>
        <div className="bus-ticket__fare">
          <div className="price">
            {formatINR(item.price)}
          </div>
          <button className="btn btn--primary" type="button" onClick={() => setOpen(open === "seat" ? "" : "seat")}>
            {open === "seat" ? "Close" : "Select seat"}
          </button>
        </div>
      </div>
      <div className="bus-ticket__links">
        <button type="button" onClick={() => setOpen(open === "policy" ? "" : "policy")}>
          Cancellation Policies
        </button>
        <button type="button" onClick={() => setOpen(open === "points" ? "" : "points")}>
          Boarding & Dropping Points
        </button>
      </div>
      {open === "seat" ? (
        <EnquiryForm
          type="bus"
          title={`Seat request · ${item.operator}`}
          submitLabel="Hold this seat"
          details={{ routeId: item.id, date: travelDate, from: item.from, to: item.to, type: item.type }}
        />
      ) : null}
      {open === "policy" ? (
        <p className="lead">Free cancellation up to 6 hours before departure. Partial refund till 2 hours before boarding.</p>
      ) : null}
      {open === "points" ? (
        <div className="bus-ticket__stops">
          <p><strong>Boarding:</strong> {(item.boarding || []).join(" · ")}</p>
          <p><strong>Dropping:</strong> {(item.dropping || []).join(" · ")}</p>
        </div>
      ) : null}
    </article>
  );
}
