import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavorites,
  getUserByName,
} from "../../Redux/actions/productsActions";
import Cards from "../cards/cards.component";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const favorites = useSelector((state) => state.myFavorites);
  const dispatch = useDispatch();
  let userId = null;

  if (user.length > 0) {
    userId = user[0].id;
  }

  const [isLoading, setIsLoading] = useState(true); // Estado para el indicador de carga

  useEffect(() => {
    dispatch(getUserByName(name));
    if (userId) {
      dispatch(getFavorites(userId));
    }
  }, [dispatch, name, userId]);

  // Cuando se complete la carga de usuario, establece isLoading en false
  useEffect(() => {
    if (user.length > 0) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div>
      <Link to={"/"}>
        <button>Inicio</button>
      </Link>
      {isLoading ? (
        <div>
          <img
            src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
            alt="Cargando..."
          />
        </div>
      ) : (
        <div>
          {name ? <h1>Hola {name}</h1> : <h1>Hola Invitado</h1>}
          {user.map((obj) => (
            <div key={obj.id}>
              <h2>Nombre: {obj.name}</h2>
              <h2>Email: {obj.email}</h2>
              <h2>Teléfono: {obj.phone ? obj.phone : "Sin información"}</h2>
              <h2>
                Dirección: {obj.address ? obj.address : "Sin información"}
              </h2>
            </div>
          ))}

          {favorites && favorites.length > 0 ? (
            <Cards products={favorites} />
          ) : (
            <p>No hay favoritos</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
