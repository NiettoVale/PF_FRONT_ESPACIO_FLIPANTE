import React, { useState } from "react";
import enviarMail from "./funcionEnviarPassword";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const back = process.env.REACT_APP_BACK;

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Validar el correo electrónico en tiempo real
    if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
      setEmailError("El correo electrónico no es válido");
    } else {
      setEmailError(null); // Borrar el mensaje de error si el correo es válido
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validar el correo electrónico antes de enviar
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("El correo electrónico no es válido");
      return;
    }

    try {
      // Realizar una solicitud GET para verificar si el correo está registrado
      const response = await fetch(`${back}user/${email}`);
      if (!response.ok) {
        alert("El correo electrónico no está registrado");
        return;
      }

      // Si llegamos aquí, el correo está registrado, por lo que podemos enviar el correo de recuperación
      enviarMail(email, "Modificar contraseña", "Hola , recupera tu contraseña");
      setError(null);

      // Mostrar una alerta cuando se envía con éxito
      alert("Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Recuperación de Contraseña</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <p className="error">{emailError}</p>}
        <button type="submit">Recuperar Contraseña</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default PasswordReset;
