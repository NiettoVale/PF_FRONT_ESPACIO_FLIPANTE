import { useEffect } from "react";
import { applyActionCode } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Vista = () => {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const mode = params.get("mode");
  const oobCode = params.get("oobCode");

  const verificarCorreoElectronico = async () => {
    try {
      if (mode === "verifyEmail" && oobCode) {
        await applyActionCode(auth, oobCode);
        alert("Correo electrónico verificado con éxito");

        // Redirige a otra página después de verificar el correo
        navigate("/login"); // Reemplaza '/tu-otra-pagina' con la URL a la que deseas redirigir
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
