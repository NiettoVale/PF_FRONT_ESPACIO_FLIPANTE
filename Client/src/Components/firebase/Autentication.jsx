import { useEffect } from "react";
import { applyActionCode } from "firebase/auth";
import { auth } from "../../firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Vista = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const mode = params.get("mode");
  const oobCode = params.get("oobCode");

  const verificarCorreoElectronico = async () => {
    try {
      if (mode === "verifyEmail" && oobCode) {
        await applyActionCode(auth, oobCode);
        MySwal.fire({
          icon: "success",
          title: "Éxito",
          text: "Correo verificado con exito.",
          timer: 3000, // Duración en milisegundos (en este caso, 3 segundos)
          timerProgressBar: true,
        });
        setTimeout(() => {
          window.location.href =
            "https://pf-front-denuevo.vercel.app/login";
        }, 3 * 1000);
        // Redirige a otra página después de verificar el correo
        // Reemplaza '/tu-otra-pagina' con la URL a la que deseas redirigir
      }
    } catch (error) {
      console.error("Error al verificar el correo electrónico:", error);
    }
  };

  useEffect(() => {
    verificarCorreoElectronico();
  }, [mode, oobCode]);

  return (
    <div>
      <h1>Aquí se realiza la verificación</h1>
    </div>
  );
};

export default Vista;
