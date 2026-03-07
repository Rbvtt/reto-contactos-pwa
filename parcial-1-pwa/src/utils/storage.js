export const guardarSesion = (usuario) => {
  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
};

export const obtenerSesion = () => {
  const usuarioGuardado = localStorage.getItem("usuarioActivo");
  return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
};

export const cerrarSesionStorage = () => {
  localStorage.removeItem("usuarioActivo");
};