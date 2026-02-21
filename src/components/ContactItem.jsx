export default function ContactItem({ contact, onDelete }) {
  return (
    <div style={styles.card}>
      <div>
        <div style={styles.name}>{contact.name}</div>
        <div style={styles.phone}>{contact.phone}</div>
      </div>

      <button onClick={() => onDelete(contact.id)} style={styles.del}>
        Eliminar
      </button>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 12,
  },
  name: { fontWeight: 700 },
  phone: { color: "#374151" },
  del: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #ef4444",
    background: "white",
    color: "#ef4444",
    cursor: "pointer",
  },
};