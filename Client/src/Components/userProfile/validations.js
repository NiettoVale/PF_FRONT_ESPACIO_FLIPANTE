// Función de validación para el nombre
export const validateName = (name) => {
  // Puedes agregar otras validaciones, como longitud mínima o máxima, caracteres permitidos, etc.
  // Ejemplo de validación de longitud mínima de 2 caracteres:
  if (name.length < 10) {
    return "El nombre debe tener al menos 10 caracteres";
  }
  return "";
};

// Función de validación para la dirección
export const validateAddress = (address) => {
  // Puedes agregar otras validaciones específicas para direcciones según tus necesidades.
  if (address.length < 8) {
    return "El nombre debe tener al menos 8 caracteres";
  }
  return "";
};

// Función de validación para el teléfono
export const validatePhone = (phone) => {
  // Puedes definir patrones de expresión regular para validar el formato del teléfono.
  // Ejemplo: Valida números de teléfono con 10 dígitos numéricos:
  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phone)) {
    return "El número de teléfono debe contener 10 dígitos numéricos";
  }
  return "";
};

// Función de validación para el DNI
export const validateDNI = (dni) => {
  // Puedes definir patrones de expresión regular para validar el formato del DNI.
  // Ejemplo: Valida DNIs con 8 dígitos numéricos:
  const dniPattern = /^\d{8}$/;
  if (!dniPattern.test(dni)) {
    return "El DNI debe contener 8 dígitos numéricos";
  }
  return "";
};
