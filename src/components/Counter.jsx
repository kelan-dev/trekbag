export default function Counter({ currentItems, totalItems, label }) {
  return (
    <p>
      <b>{currentItems}</b> / {totalItems} {label}
    </p>
  );
}
