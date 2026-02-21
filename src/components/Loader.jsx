export default function Loader({ text = "Cargando..." }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.spinner} aria-label="loading" />
      <p style={styles.text}>{text}</p>
    </div>
  );
}

const styles = {
  wrap: {
    display: "grid",
    placeItems: "center",
    padding: 24,
    gap: 10,
    border: "1px solid #ddd",
    borderRadius: 12,
  },
  spinner: {
    width: 34,
    height: 34,
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #111827",
    borderRadius: "50%",
    animation: "spin 0.9s linear infinite",
  },
  text: { margin: 0, color: "#374151" },
};