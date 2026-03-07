export const guardarSesion = (usuario: any) => {
  localStorage.setItem("usuarioIonic", JSON.stringify(usuario));
};

export const obtenerSesion = () => {
  const sesion = localStorage.getItem("usuarioIonic");
  return sesion ? JSON.parse(sesion) : null;
};

export const cerrarSesionStorage = () => {
  localStorage.removeItem("usuarioIonic");
};