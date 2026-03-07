import { useEffect, useState } from "react";
import FormularioPaciente from "./FormularioPaciente";
import TablaPacientes from "./TablaPacientes";
import BuscadorPacientes from "./BuscadorPacientes";
import { guardarPacientes, obtenerPacientes } from "../utils/pacientesStorage";

function Dashboard({ usuarioActivo }) {
  const [pacientes, setPacientes] = useState(() => obtenerPacientes());
  const [busqueda, setBusqueda] = useState("");
  const [pacienteAEditar, setPacienteAEditar] = useState(null);

  useEffect(() => {
    guardarPacientes(pacientes);
  }, [pacientes]);

  const guardarPaciente = (paciente) => {
    if (pacienteAEditar) {
      const pacientesActualizados = pacientes.map((item) =>
        item.id === pacienteAEditar.id
          ? { ...paciente, id: pacienteAEditar.id }
          : item
      );

      setPacientes(pacientesActualizados);
      setPacienteAEditar(null);
      return;
    }

    const nuevoPaciente = {
      ...paciente,
      id: Date.now(),
    };

    setPacientes((prev) => [...prev, nuevoPaciente]);
  };

  const editarPaciente = (paciente) => {
    setPacienteAEditar(paciente);
  };

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter((paciente) => paciente.id !== id);
    setPacientes(pacientesActualizados);

    if (pacienteAEditar && pacienteAEditar.id === id) {
      setPacienteAEditar(null);
    }
  };

  const cancelarEdicion = () => {
    setPacienteAEditar(null);
  };

  const pacientesFiltrados = pacientes.filter((paciente) => {
    const texto = busqueda.toLowerCase();

    return (
      paciente.nombre.toLowerCase().includes(texto) ||
      paciente.apellido.toLowerCase().includes(texto) ||
      String(paciente.dni).toLowerCase().includes(texto)
    );
  });

  return (
    <main className="dashboard">
      <section className="card">
        <h2>Bienvenido, {usuarioActivo.nombre}</h2>
        <p>Has iniciado sesión correctamente en la PWA de la clínica.</p>
      </section>

      {usuarioActivo.rol === "recepcionista" && (
        <>
          <section className="card">
            <h2>Vista de recepcionista</h2>
            <ul>
              <li>Registrar pacientes</li>
              <li>Actualizar datos básicos</li>
              <li>Consultar agenda general</li>
            </ul>
          </section>

          <FormularioPaciente
            onGuardarPaciente={guardarPaciente}
            pacienteAEditar={pacienteAEditar}
            onCancelarEdicion={cancelarEdicion}
          />
        </>
      )}

      {usuarioActivo.rol === "medico" && (
        <>
          <section className="card">
            <h2>Vista de médico</h2>
            <ul>
              <li>Consultar historial resumido</li>
              <li>Ver pacientes asignados</li>
              <li>Revisar próximas visitas</li>
            </ul>
          </section>

          <section className="card">
            <h2>Estadísticas</h2>
            <p>Total de pacientes registrados: {pacientes.length}</p>
            <p>Resultados de búsqueda visibles: {pacientesFiltrados.length}</p>
          </section>
        </>
      )}

      <BuscadorPacientes busqueda={busqueda} setBusqueda={setBusqueda} />

      <TablaPacientes
        pacientes={pacientesFiltrados}
        onEditarPaciente={editarPaciente}
        onEliminarPaciente={eliminarPaciente}
      />
    </main>
  );
}

export default Dashboard;