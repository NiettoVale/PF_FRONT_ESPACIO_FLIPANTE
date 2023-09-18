import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const back = process.env.REACT_APP_BACK;

function ModifyPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [id, setId] = useState(null); // Agregamos un estado para almacenar la ID
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      // Validar el correo electrónico en tiempo real
      const emailIsValid = /^\S+@\S+\.\S+$/.test(value);
      setEmailError(emailIsValid ? '' : 'El correo electrónico no es válido');
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // Contraseñas no coinciden, muestra una alerta
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (emailError) {
      // El correo no es válido, muestra una alerta
      alert('El correo electrónico no es válido.');
      return;
    }

    try {
      // Realiza la solicitud GET con fetch
      const response = await fetch(`${back}user/${email}`);

      // console.log(response);
      if (!response.ok) {
        // Correo no registrado, muestra una alerta
        alert('El correo electrónico no está registrado.');
        return;
      }

      // Parsea la respuesta como JSON
      const data = await response.json();

      // Almacenar la ID del usuario en el estado
      setId(data.id);

      // Realiza la solicitud PUT para cambiar la contraseña
      const putResponse = await fetch(`${back}modify-password/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: password, // Usamos la nueva contraseña del estado
        }),
      });

      if (!putResponse.ok) {
        throw new Error(`Error en la solicitud PUT: ${putResponse.status}`);
      }

      // Limpia los campos del formulario
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setMessage('Contraseña cambiada con éxito.');
      alert('Contraseña cambiada exitosamente');
      navigate('/login');
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Maneja otros errores si es necesario
    }
  };

  return (
    <div>
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Ingresa tu Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div>
          <label htmlFor="password">Nueva Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Cambiar Contraseña</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ModifyPassword;
