import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

const INITIAL_CONTACTS = [
  { id: crypto.randomUUID(), name: "Ana Gómez", phone: "3001234567" },
  { id: crypto.randomUUID(), name: "Carlos Ruiz", phone: "3109876543" },
  { id: crypto.randomUUID(), name: "Laura Pérez", phone: "3205551122" },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  // Simula carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts(INITIAL_CONTACTS);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const addContact = ({ name, phone }) => {
    setContacts((prev) => [
      { id: crypto.randomUUID(), name, phone },
      ...prev,
    ]);
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📒 Contactos</h1>

      {loading ? (
        <Loader text="Cargando contactos..." />
      ) : (
        <>
          <ContactForm onAdd={addContact} />
          <ContactList contacts={contacts} onDelete={deleteContact} />
        </>
      )}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 520,
    margin: "40px auto",
    padding: 16,
    fontFamily: "system-ui, Arial",
  },
  title: { marginBottom: 12 },
};