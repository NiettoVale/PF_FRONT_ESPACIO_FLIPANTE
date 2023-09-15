import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserList.module.css";
import Swal from "sweetalert2";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    DNI: "",
    imageProfile: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const back = process.env.REACT_APP_BACK;

  // Guarda la lista completa de usuarios
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${back}users`)
      .then((response) => {
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);
        setAllUsers(fetchedUsers);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de usuarios:", error);
      });
  }, []);

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setNewUserData({ ...userToEdit });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setNewUserData({
      name: "",
      email: "",
      phone: "",
      address: "",
      DNI: "",
      imageProfile: "",
    });
  };

  const handleSave = () => {
    if (editingUserId !== null) {
      axios
        .post(`${back}update-user/${editingUserId}`, newUserData)
        .then(() => {
          const updatedUsers = users.map((user) =>
            user.id === editingUserId ? { ...user, ...newUserData } : user
          );
          setUsers(updatedUsers);
          setEditingUserId(null);
          setNewUserData({
            name: "",
            email: "",
            phone: "",
            address: "",
            DNI: "",
            imageProfile: "",
          });
        })
        .catch((error) => {
          console.error("Error al guardar los cambios:", error);
        });
    }
  };

  const handleDelete = (userId) => {
    // Mostrar una alerta de confirmación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, banear",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, realizar la acción de borrado
        axios
          .delete(`${back}delete-user/${userId}`)
          .then((response) => {
            if (response.status === 200) {
              const updatedUsers = users.map((user) =>
                user.id === userId ? { ...user, eliminado: true } : user
              );
              const filteredUsers = updatedUsers.filter(
                (user) => !user.eliminado
              );
              setUsers(filteredUsers);

              // Mostrar una alerta de éxito
              Swal.fire({
                title: "Baneado con éxito",
                icon: "success",
              });
            } else {
              console.error(
                "Error al marcar al usuario como eliminado:",
                response.data.message
              );
            }
          })
          .catch((error) => {
            console.error("Error al eliminar el usuario:", error);
          });
      }
    });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filtra los resultados de búsqueda en la lista completa de usuarios
    const searchResults = allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Actualiza la lista de usuarios mostrados con los resultados de la búsqueda
    setUsers(searchResults);
    // Regresa a la primera página después de una búsqueda
    setCurrentPage(1);
  };

  // Lógica para el paginado
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={handleSearch} // Actualiza la búsqueda en tiempo real
      />
      <div>
        {Array(totalPages)
          .fill()
          .map((_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>DNI</th>
            <th>Imagen de Perfil</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={newUserData.name}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, name: e.target.value })
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={newUserData.email}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={newUserData.phone}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, phone: e.target.value })
                    }
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={newUserData.address}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        address: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.address
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={newUserData.DNI}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        DNI: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.DNI
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={newUserData.imageProfile}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        imageProfile: e.target.value,
                      })
                    }
                  />
                ) : (
                  <img
                    src={
                      user.imageProfile ||
                      "https://static.vecteezy.com/system/resources/previews/010/260/479/non_2x/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
                    }
                    alt={user.name}
                    className={styles.userImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://static.vecteezy.com/system/resources/previews/010/260/479/non_2x/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg";
                    }}
                  />
                )}
              </td>
              <td>{user.eliminado ? "Baneado" : "Activo"}</td>
              <td>
                {editingUserId === user.id ? (
                  <div>
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user.id)}>Editar</button>
                    <button onClick={() => handleDelete(user.id)}>
                      Banear
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
