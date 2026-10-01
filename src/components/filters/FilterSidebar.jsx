"use client";

import { formatINR } from "@/utils/format";
import { Filter, Search, X, Check } from "lucide-react";

export default function FilterSidebar({
  title = "Filters",
  onClear,
  open,
  onClose,
  children,
}) {
  return (
    <>
      <aside className={`filter-sidebar ${open ? "is-open" : ""}`}>
        <div className="filter-sidebar__head">
          <div className="d-flex align-items-center gap-2">
            <Filter
              size={18}
              className="text-warning-emphasis"
              fill="#e67e22"
              color="#e67e22"
            />
            <h3 className="filter-sidebar__title">{title}</h3>
          </div>
          <div className="filter-sidebar__actions">
            <button type="button" className="filter-clear" onClick={onClear}>
              Clear all
            </button>
            <button
              type="button"
              className="filter-sidebar__close"
              onClick={onClose}
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="filter-sidebar__content">{children}</div>
      </aside>
      {open ? (
        <button
          type="button"
          className="filter-backdrop"
          aria-label="Close filters"
          onClick={onClose}
        />
      ) : null}
    </>
  );
}

export function FilterGroup({ title, onReset, children }) {
  return (
    <div className="filter-group">
      {title && (
        <div className="filter-group__head">
          <h4>{title}</h4>
          {onReset && (
            <button
              type="button"
              className="filter-group__reset"
              onClick={onReset}
            >
              Reset
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export function FilterCheck({ label, checked, onChange, count }) {
  return (
    <label className="filter-check">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="filter-check__input"
      />
      <span className="filter-check__box">
        {checked && <Check size={12} strokeWidth={3} className="text-white" />}
      </span>
      <span className="filter-check__label">{label}</span>
      {count !== undefined && (
        <span className="filter-check__count">{count}</span>
      )}
    </label>
  );
}

export function FilterRadio({ name, label, value, checked, onChange }) {
  return (
    <label className="filter-check">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="filter-check__input"
      />
      <span className="filter-check__box filter-check__box--radio">
        {checked && <span className="radio-inner" />}
      </span>
      <span className="filter-check__label">{label}</span>
    </label>
  );
}

export function FilterSearch({
  value,
  onChange,
  placeholder = "location / hotel name",
}) {
  return (
    <div className="filter-search-wrap">
      <Search size={16} className="filter-search-icon" />
      <input
        className="filter-search"
        type="search"
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export function FilterRange({ min, max, value, onChange, step = 100 }) {
  return (
    <div className="filter-range">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="filter-range__meta">
        <span>{formatINR(min)}</span>
        <strong>Up to {formatINR(value)}</strong>
      </div>
    </div>
  );
}

export function FilterDualRange({
  min = 0,
  max = 90000,
  minValue,
  maxValue,
  onMin,
  onMax,
  step = 500,
}) {
  const minPercent = Math.min(100, Math.max(0, ((minValue - min) / (max - min)) * 100));
  const maxPercent = Math.min(100, Math.max(0, ((maxValue - min) / (max - min)) * 100));

  return (
    <div className="filter-range">
      <div className="filter-range__track-container">
        <div
          className="filter-range__fill"
          style={{
            left: `${minPercent}%`,
            width: `${Math.max(0, maxPercent - minPercent)}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) => onMin(Math.min(Number(e.target.value), maxValue - step))}
          className="filter-range__slider thumb-left"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) => onMax(Math.max(Number(e.target.value), minValue + step))}
          className="filter-range__slider thumb-right"
        />
      </div>

      <div className="filter-range__meta">
        <span className="range-bound">{formatINR(min)}</span>
        <div className="range-badge">
          {formatINR(minValue)} – {formatINR(maxValue)}
        </div>
        <span className="range-bound">₹{Math.round(max / 1000)}k</span>
      </div>
    </div>
  );
}

export function SortTabs({ value, onChange, options }) {
  return (
    <div className="sort-tabs">
      <span>Sort by:</span>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={value === option.value ? "is-active" : ""}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function Pagination({ page, pages, onPage, perPage, onPerPage, total }) {
  return (
    <div className="pager">
      <label>
        Items per page
        <select
          value={perPage}
          onChange={(event) => onPerPage(Number(event.target.value))}
        >
          {[6, 9, 12, 15].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <div className="pager__pages">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          ‹
        </button>
        <span>
          {Math.min((page - 1) * perPage + 1, total || 0)} -{" "}
          {Math.min(page * perPage, total || 0)} of {total}
        </span>
        <button
          type="button"
          disabled={page >= pages}
          onClick={() => onPage(page + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export function SearchSteps({ steps, active }) {
  return (
    <div className="search-steps">
      {steps.map((label, index) => (
        <span
          key={label}
          className={`search-step${index + 1 === active ? " is-active" : ""}`}
        >
          {index + 1}. {label}
        </span>
      ))}
    </div>
  );
}

export function ResultsToolbar({
  count,
  noun,
  sort,
  onSort,
  options,
  onOpenFilters,
}) {
  return (
    <div className="results-toolbar">
      <strong>
        {count} {noun}
        {count === 1 ? "" : "s"} found
      </strong>
      <div className="results-toolbar__right">
        <button
          type="button"
          className="btn btn--outline filter-open"
          onClick={onOpenFilters}
        >
          Filters
        </button>
        <label className="sort-field">
          <span>Sort</span>
          <select value={sort} onChange={(event) => onSort(event.target.value)}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
