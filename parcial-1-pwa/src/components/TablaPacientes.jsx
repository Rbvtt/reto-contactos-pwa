import { useState } from "react";
import ModalConfirmacion from "./ModalConfirmacion";

function TablaPacientes({ pacientes, onEditarPaciente, onEliminarPaciente }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [pacienteAEliminar, setPacienteAEliminar] = useState(null);

  const abrirModal = (paciente) => {
    setPacienteAEliminar(paciente);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setPacienteAEliminar(null);
    setModalAbierto(false);
  };

  const confirmarEliminacion = () => {
    if (pacienteAEliminar) {
      onEliminarPaciente(pacienteAEliminar.id);
    }
    cerrarModal();
  };

  return (
    <section className="card">
      <h2>Listado de pacientes</h2>

      {pacientes.length === 0 ? (
        <p>No hay pacientes registrados.</p>
      ) : (
        <div className="tabla-responsive">
          <table className="tabla-pacientes">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>DNI</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td>{paciente.nombre} {paciente.apellido}</td>
                  <td>{paciente.dni}</td>
                  <td>{paciente.telefono}</td>
                  <td className="acciones-tabla">
                    <button onClick={() => onEditarPaciente(paciente)}>Editar</button>
                    <button
                      className="btn-eliminar"
                      onClick={() => abrirModal(paciente)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ModalConfirmacion
        abierto={modalAbierto}
        mensaje={
          pacienteAEliminar
            ? `¿Seguro que deseas eliminar a ${pacienteAEliminar.nombre} ${pacienteAEliminar.apellido}?`
            : ""
        }
        onConfirmar={confirmarEliminacion}
        onCancelar={cerrarModal}
      />
    </section>
  );
}

export default TablaPacientes;