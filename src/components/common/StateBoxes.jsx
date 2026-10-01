export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="state-box" role="status">
      <div className="loader" />
      <p>{label}</p>
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="state-box">
      <p>{message || "Something went wrong. Please refresh and try again."}</p>
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="state-box">
      <p>{message || "Nothing matches this search yet. Try different dates or a nearby city."}</p>
    </div>
  );
}
