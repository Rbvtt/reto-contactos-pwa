const CLAVE_PACIENTES = "medicare_pacientes";

export const guardarPacientes = (pacientes) => {
  localStorage.setItem(CLAVE_PACIENTES, JSON.stringify(pacientes));
};

export const obtenerPacientes = () => {
  const pacientesGuardados = localStorage.getItem(CLAVE_PACIENTES);
  return pacientesGuardados ? JSON.parse(pacientesGuardados) : [];
};