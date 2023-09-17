import React, { useState } from "react";
import { auth } from "./firebase.config"; // Importa auth desde el archivo de configuración

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await auth.sendPasswordResetEmail(email);
      setIsSent(true);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsSent(false);
    }
  };

  return (
    <div>
      <h2>Recuperación de Contraseña</h2>
      {isSent ? (
        <p>
          Se ha enviado un correo electrónico con las instrucciones para
          restablecer tu contraseña.
        </p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit">Recuperar Contraseña</button>
        </form>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PasswordReset;
