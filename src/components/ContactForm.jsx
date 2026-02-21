import { useState } from "react";

export default function ContactForm({ onAdd }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) return;

    onAdd({ name: trimmedName, phone: trimmedPhone });
    setName("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.row}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          style={styles.input}
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono"
          inputMode="tel"
          style={styles.input}
        />
      </div>

      <button type="submit" style={styles.btn}>
        + Agregar
      </button>
    </form>
  );
}

const styles = {
  form: {
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    display: "grid",
    gap: 10,
  },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  input: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #d1d5db",
    outline: "none",
  },
  btn: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "none",
    background: "#111827",
    color: "white",
    cursor: "pointer",
    justifySelf: "start",
  },
};