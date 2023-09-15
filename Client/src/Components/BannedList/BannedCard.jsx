import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const back = process.env.REACT_APP_BACK;

const MySwal = withReactContent(Swal);

const CardBan = ({ id, name, address, phone, imageProfile, deleted }) => {
  const formData = {
    deleted: false,
  };

  const handleClick = () => {
    // Mostrar una alerta de confirmación antes de desbanear
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desbanear",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, realiza la acción de desbanear
        desbanearUsuario();
      }
    });
  };

  const desbanearUsuario = async () => {
    try {
      const response = await fetch(`${back}update-user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Error al actualizar el usuario: ${response.statusText}`
        );
      }

      if (response.status === 200) {
        // Mostrar una alerta de éxito
        MySwal.fire({
          icon: "success",
          title: "Usuario Desbaneado",
          text: "El usuario ha sido desbaneado con éxito.",
        }).then(() => {
          // Recargar la página después de 2 segundos
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table>
      <tbody>
        <tr>
          <td>ID:</td>
          <td>{id}</td>
          <td>Nombre:</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Dirección:</td>
          <td>{address || "No hay datos"}</td>
          <td>Teléfono:</td>
          <td>{phone || "No hay datos"}</td>
        </tr>
        <tr>
          <td>Imagen:</td>
          <td>{imageProfile || "No hay datos"}</td>
          <td>Estado:</td>
          <td>{deleted ? "Baneado" : "Activo"}</td>
        </tr>
        <button onClick={handleClick}>Desbanear</button>
      </tbody>
    </table>
  );
};

export default CardBan;
