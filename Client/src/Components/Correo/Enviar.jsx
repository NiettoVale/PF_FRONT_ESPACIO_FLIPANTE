// FacebookLogin.js
import React from "react";
import enviar from "./funcionEnviar";

function Enviar() {

    function submitHandler(event){
        event.preventDefault();
        let correo = event.target.correo.value;
        let asunto = event.target.asunto.value;
        let texto = event.target.texto.value;
        enviar(correo,asunto,texto);
        correo = asunto = texto = "";

    }

  return (
  
    <form onSubmit={submitHandler}>
          <h1>ENVIO</h1>
       <input type="text" name="correo" /> 
       <input type="text" name="asunto" /> 
       <input type="text" name="texto" /> 
  
       <button type="">Enviar correo</button>



    </form>
    // <button onClick={handleFacebooklogin}>
    //   Log in with Facebook
    // </button>
  );
}

export default Enviar;
