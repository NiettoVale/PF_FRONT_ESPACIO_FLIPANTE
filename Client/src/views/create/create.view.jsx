import React from "react";
import CreateForm from "../../Components/CreateForm/CreateForm";

const CreateProduct = () => {
  return (
    <div className="create-product">
      <h2>Crear Nuevo Producto</h2>
      <p> Completa los detalles del nuevo producto:</p>
      <CreateForm />
    </div>
  );
};

export default CreateProduct;
