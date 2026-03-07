function PerfilUsuario({ usuario }) {
  const obtenerIniciales = (nombre) => {
    return nombre
      .split(" ")
      .map((palabra) => palabra[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="perfil-usuario">
      {usuario.avatar ? (
        <img
          src={usuario.avatar}
          alt={usuario.nombre}
          className="avatar"
        />
      ) : (
        <div className="avatar avatar-iniciales">
          {obtenerIniciales(usuario.nombre)}
        </div>
      )}

      <div>
        <h3>{usuario.nombre}</h3>
        <p>{usuario.rol}</p>
      </div>
    </div>
  );
}

export default PerfilUsuario;