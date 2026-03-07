import PerfilUsuario from "./PerfilUsuario";

function Header({ usuarioActivo, onLogout }) {
  return (
    <header className="header">
      <div>
        <h1>Panel de administración clínica</h1>
        <p>Gestión interna de pacientes y consultas</p>
      </div>

      <div className="header-derecha">
        <PerfilUsuario usuario={usuarioActivo} />
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
}

export default Header;