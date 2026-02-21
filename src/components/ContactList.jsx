import ContactItem from "./ContactItem";

export default function ContactList({ contacts, onDelete }) {
  if (contacts.length === 0) {
    return (
      <div style={styles.empty}>
        No hay contactos todavía. Agrega el primero 👀
      </div>
    );
  }

  return (
    <div style={styles.list}>
      {contacts.map((c) => (
        <ContactItem key={c.id} contact={c} onDelete={onDelete} />
      ))}
    </div>
  );
}

const styles = {
  list: { display: "grid", gap: 10 },
  empty: {
    padding: 14,
    borderRadius: 12,
    border: "1px dashed #d1d5db",
    color: "#374151",
  },
};