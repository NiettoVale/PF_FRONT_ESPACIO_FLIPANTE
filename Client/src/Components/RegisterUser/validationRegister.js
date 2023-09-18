const validationRegister = (registerData) => {
  const errors = {};

  if (registerData.password.length > 25 || registerData.password.length < 6) {
    errors.invalidPassword = "La contraseña debe tener entre 6 y 25 caracteres";
  }

  if (
    registerData.name.trim().length < 6 ||
    registerData.name.trim().length > 20
  ) {
    errors.invalidName = "El nombre debe tener entre 6 y 20 caracteres";
  }

  if (!/^\S+@\S+\.\S+$/.test(registerData.email)) {
    errors.invalidEmail = "El correo electrónico no es válido";
  }

  return errors;
};

export default validationRegister;
