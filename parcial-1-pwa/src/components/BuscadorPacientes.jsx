function BuscadorPacientes({ busqueda, setBusqueda }) {
  return (
    <section className="card">
      <h2>Buscar pacientes</h2>
      <input
        type="text"
        placeholder="Buscar por nombre, apellido o DNI"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </section>
  );
}

export default BuscadorPacientes;