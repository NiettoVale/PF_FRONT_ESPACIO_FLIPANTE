/*
Creamos una funcion que nos sirva para validar el registro de un nuevo
usuario pasandole como parametro la informacion del login.
*/

const validationRegister = (registerData) => {
    // Creamos un objeto para almacenar los errores.
    const errors = {};
  
    // Verificamos si la password supera los 25 caracteres o si tiene menos de 6,
    // si es asi cargamos un error.
    if (registerData.password.length > 25 || registerData.password.length < 6) {
      errors.invalidPassword = "La contraseña debe tener entre 6 y 25 caracteres";
    }
  
    // Verificamos si el nombre sin espacios supera los 25 caracteres
    // o si tiene menos de 6 si es asi cargamos un error.
    if (
      registerData.name.trim().length < 6 ||
      registerData.name.trim().length > 20
    ) {
      errors.invalidName = "El nombre debe tener entre 6 y 20 caracteres";
    }
  
    // Devolvemos el objeto con los errores cargados.
    return errors;
  };
  
  export default validationRegister;