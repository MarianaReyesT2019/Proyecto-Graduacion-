import { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Typography, Box } from "@mui/material";

export const Users = () => {
  const USER_ENDPOINT = import.meta.env.VITE_USER_ENDPOINT;

  const [usuarios, setUsuarios] = useState([]);

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const toggleUserStatus = async (user) => {
    try {
      const newStatus = user.Activo === true ? false : true;

      const response = await fetch(`${USER_ENDPOINT}/${user.UsuarioID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}` 
        },
        body: JSON.stringify({ ...user, Activo: newStatus })
      });

      if (response.ok) {
        const updatedUsers = usuarios.map((u) =>
          u.UsuarioID === user.UsuarioID ? { ...u, Activo: newStatus } : u
        );
        setUsuarios(updatedUsers);
      } else {
        console.error("Error updating user status");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        console.log(sessionStorage.getItem("token"));
        const response = await fetch(USER_ENDPOINT, {
          headers: {
            "Authorization": `Bearer ${getToken()}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          console.error("Error getting users");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <Box>
      <Typography variant="h3" gutterBottom style={{ margin: 15 }}>
        Usuarios
      </Typography>
      <Table style={{ margin: 20, width: 1600 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((user) => (
            <TableRow key={user.UsuarioID}>
              <TableCell>{user.UsuarioID}</TableCell>
              <TableCell>{user.Nombre}</TableCell>
              <TableCell>{user.Apellidos}</TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell>{user.Rol}</TableCell>
              <TableCell>
                {user.Activo ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => toggleUserStatus(user)}
                  >
                    Activo
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => toggleUserStatus(user)}
                  >
                    Desactivado
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
