const validationRegister = (registerData) => {
  const errors = {};

  if (registerData.password.length > 25 || registerData.password.length < 6) {
    errors.invalidPassword = "La contraseña debe tener entre 6 y 25 caracteres";
  }

  // Validación del nombre
  const nameWithoutSpaces = registerData.name.replace(/\s+/g, "_"); // Reemplazar espacios por guiones bajos

  if (nameWithoutSpaces.length < 6 || nameWithoutSpaces.length > 20) {
    errors.invalidName =
      "El nombre debe tener entre 6 y 20 caracteres sin espacios en blanco";
  }

  // Validación del correo electrónico
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(registerData.email)) {
    errors.invalidEmail = "El correo electrónico no es válido";
  }

  return errors;
};

export default validationRegister;
