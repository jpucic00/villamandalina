const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 1.8l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9l7.1-.6z" />
  </svg>
);

export default function Wordmark() {
  return (
    <span className="wordmark">
      <span className="wordmark__name">Villa Mandalina</span>
      <span className="wordmark__stars" aria-label="4 stars">
        <Star />
        <Star />
        <Star />
        <Star />
      </span>
    </span>
  );
}
