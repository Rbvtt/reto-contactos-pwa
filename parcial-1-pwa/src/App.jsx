import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { usuariosMock } from "./data/usuariosMock";
import {
  guardarSesion,
  obtenerSesion,
  cerrarSesionStorage,
} from "./utils/storage";

function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  useEffect(() => {
    const sesionGuardada = obtenerSesion();
    if (sesionGuardada) {
      setUsuarioActivo(sesionGuardada);
    }
  }, []);

  const handleLogin = (email, password) => {
    const usuarioEncontrado = usuariosMock.find(
      (usuario) =>
        usuario.email === email && usuario.password === password
    );

    if (!usuarioEncontrado) {
      return false;
    }

    setUsuarioActivo(usuarioEncontrado);
    guardarSesion(usuarioEncontrado);
    return true;
  };

  const handleLogout = () => {
    setUsuarioActivo(null);
    cerrarSesionStorage();
  };

  if (!usuarioActivo) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Header usuarioActivo={usuarioActivo} onLogout={handleLogout} />
      <Dashboard usuarioActivo={usuarioActivo} />
    </div>
  );
}

export default App;