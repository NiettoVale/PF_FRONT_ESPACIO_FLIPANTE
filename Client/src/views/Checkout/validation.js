export function validate(input) {
  let errors = {};

  if (
    !input.nombre ||
    input.nombre.trim() === "" ||
    input.nombre.length > 10 ||
    /^\s+$/.test(input.nombre)
  ) {
    errors.nombre = "Nombre no válido";
  } else {
    errors.nombre = "";
  }

  if (
    !input.apellido ||
    input.apellido.trim() === "" ||
    input.apellido.length > 10 ||
    /^\s+$/.test(input.apellido)
  ) {
    errors.apellido = "Apellido no válido";
  } else {
    errors.apellido = "";
  }

  if (!/^\d{7,14}$/.test(input.dniCuitCuil)) {
    errors.dniCuitCuil = "DNI/CUIT/CUIL no válido";
  } else {
    errors.dniCuitCuil = "";
  }

  if (
    !/^[\w\dÁÉÍÓÚÑáéíóíúñÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÇç.,_-][\w\s\dÁÉÍÓÚÑáéíóíúñÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÇç.,_-]{0,99}$/.test(
      input.direccion
    ) ||
    input.direccion.length < 5
  ) {
    errors.direccion = "Dirección no válida";
  } else {
    errors.direccion = "";
  }

  if (
    !input.apartamento ||
    input.apartamento.trim() === "" ||
    input.apartamento.length > 15
  ) {
    errors.apartamento = "Apartamento no válido";
  } else {
    errors.apartamento = "";
  }

  if (!/^\d{1,5}$/.test(input.cp.trim())) {
    errors.cp = "Código Postal no válido";
  } else {
    errors.cp = "";
  }

  if (
    !/^[\w\dÁÉÍÓÚÑáéíóíúñÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÇç.,_-][\w\s\dÁÉÍÓÚÑáéíóíúñÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÇç.,_-]{0,99}$/.test(
      input.ciudad.trim()
    ) ||
    input.ciudad.length < 2 ||
    input.ciudad.length > 10
  ) {
    errors.ciudad = "Ciudad no válida";
  } else {
    errors.ciudad = "";
  }

  if (
    !/^[\w\sÁÉÍÓÚÑáéíóíúñÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÇç.,_-]{4,100}$/.test(
      input.provincia.trim()
    )
  ) {
    errors.provincia = "Provincia no válida";
  } else {
    errors.provincia = "";
  }

  if (!/^\d{1,10}$/.test(input.telefono) || /^\s+$/.test(input.telefono)) {
    errors.telefono = "Teléfono no válido";
  } else {
    errors.telefono = "";
  }

  return errors;
}
