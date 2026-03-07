import { useState } from "react";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const loginExitoso = onLogin(email, password);

    if (!loginExitoso) {
      setError("Credenciales incorrectas");
      return;
    }

    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <h1>Clínica PWA</h1>
      <p>Inicia sesión para continuar</p>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginForm;