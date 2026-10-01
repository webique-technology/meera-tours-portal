"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const currencies = [
  { code: "INR", symbol: "₹", label: "₹ INR" },
  { code: "USD", symbol: "$", label: "$ USD" },
  { code: "AED", symbol: "AED", label: "AED AED" },
  { code: "CAD", symbol: "$", label: "$ CAD" },
  { code: "EUR", symbol: "€", label: "€ EUR" },
  { code: "GBP", symbol: "£", label: "£ GBP" },
];

export const CurrencySelect = ({
  value = "INR",
  onChange,
  className = "",
  btnClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption =
    currencies.find((c) => c.code === selected) || currencies[0];

  const handleSelect = (code) => {
    setSelected(code);
    setIsOpen(false);
    if (onChange) onChange(code);
  };

  return (
    <div
      ref={containerRef}
      className={`currency-select-wrapper position-relative w-100 ${className}`}
    >
      {/* Clickable Card / Button */}
      <button
        type="button"
        className={`currency-select-btn px-3 py-2 w-100 d-flex align-items-center justify-content-between bg-white rounded-3 border ${btnClass}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="currency-label d-flex align-items-center gap-2">
          <span className="text-secondary fw-normal">Currency :</span>
          <span className="fw-medium text-dark">{currentOption.label}</span>
        </span>
        <ChevronDown
          size={18}
          className={`currency-chevron text-secondary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu (matching screenshot 2) */}
      {isOpen && (
        <ul className="currency-dropdown-menu list-unstyled position-absolute start-0 top-100 w-100 mt-1 bg-white rounded-3 shadow border m-0 p-0 overflow-hidden z-3">
          {currencies.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                className={`currency-dropdown-item w-100 text-start px-3 py-2 border-0 bg-transparent text-dark ${
                  item.code === selected ? "is-selected" : ""
                }`}
                onClick={() => handleSelect(item.code)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const FormOptionSelect = ({
  label = "Sort By:",
  options = [],
  value,
  onChange,
  className = "",
  btnClassName = "common-select-btn",
  placeholder = "Select an option",
  native = false, // Set to true if you want standard browser HTML select
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (native) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [native]);

  // Find currently selected option object
  const currentOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue) => {
    setIsOpen(false);
    if (onChange) {
      onChange(optionValue);
    }
  };

  // Native HTML Select fallback
  if (native) {
    return (
      <label className={`common-select-label ${className}`}>
        {label && <span className="text-secondary me-2">{label}</span>}
        <select
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="form-select d-inline-block w-auto"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  // Custom Full-Clickable Dropdown UI
  return (
    <div
      ref={containerRef}
      className={`common-select-wrapper position-relative ${className}`}
    >
      <button
        type="button"
        className={`common-select-btn w-100 d-flex align-items-center justify-content-between px-3 py-2 bg-white rounded-4 border ${btnClassName}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="d-flex align-items-center gap-2 text-truncate">
          {label && <span className="text-secondary fw-normal">{label}</span>}
          <span className="fw-medium text-dark text-truncate">
            {currentOption ? currentOption.label : placeholder}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`common-select-chevron text-secondary flex-shrink-0 ms-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="common-select-menu list-unstyled position-absolute start-0 top-100 w-100 mt-1 bg-white rounded-3 shadow border m-0 p-0 overflow-hidden z-3">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  className={`common-select-item w-100 text-start px-3 py-2 border-0 bg-transparent text-dark ${
                    isSelected ? "is-selected fw-semibold bg-light" : ""
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
