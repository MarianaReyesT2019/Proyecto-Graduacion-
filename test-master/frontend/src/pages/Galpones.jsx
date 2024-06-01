import React, { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Typography, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export const Galpones = () => {
  const GALPONES_ENDPOINT = import.meta.env.VITE_GALPONES;
  const [galpones, setGalpones] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre_galpon: "",
    CantidadGallinas: "",
  });
  const [selectedGalponId, setSelectedGalponId] = useState(null);

  useEffect(() => {
    fetchGalpones();
  }, []);

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const fetchGalpones = async () => {
    try {
      const response = await fetch(GALPONES_ENDPOINT, {
        headers: {
          "Authorization": `Bearer ${getToken()}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setGalpones(data);
      } else {
        console.error("Error al obtener los galpones");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateGalpon = async () => {
    try {
      const response = await fetch(GALPONES_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchGalpones();
        setOpenForm(false);
        setFormData({
          nombre_galpon: "",
          CantidadGallinas: "",
        });
      } else {
        console.error("Error creando el galpón");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateGalpon = async () => {
    try {
      const response = await fetch(`${GALPONES_ENDPOINT}/${selectedGalponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchGalpones();
        setOpenForm(false);
        setSelectedGalponId(null);
        setFormData({
          nombre_galpon: "",
          CantidadGallinas: "",
        });
      } else {
        console.error("Error actualizando el galpón");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGalpon = async (id) => {
    try {
      const response = await fetch(`${GALPONES_ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${getToken()}`
        },
      });
      if (response.ok) {
        fetchGalpones();
      } else {
        console.error("Error eliminando el galpón");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditGalpon = (galpon) => {
    setFormData({
      nombre_galpon: galpon.nombre_galpon,
      CantidadGallinas: galpon.CantidadGallinas,
    });
    setSelectedGalponId(galpon.ID);
    setOpenForm(true);
  };

  return (
    <Box>
      <Typography variant="h3" gutterBottom style={{ margin: 15 }}>
        Galpones
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenForm} style={{ margin: 20 }}>
        Crear Galpón
      </Button>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>
          {selectedGalponId ? "Editar" : "Crear"} Galpón
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre Galpón"
            name="nombre_galpon"
            value={formData.nombre_galpon}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad de Gallinas"
            name="CantidadGallinas"
            value={formData.CantidadGallinas}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button
            onClick={selectedGalponId ? handleUpdateGalpon : handleCreateGalpon}
            color="primary"
          >
            {selectedGalponId ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
      <Table style={{ margin: 20, width: 1880 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre Galpón</TableCell>
            <TableCell>Cantidad de Gallinas</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {galpones.map((galpon) => (
            <TableRow key={galpon.ID}>
              <TableCell>{galpon.ID}</TableCell>
              <TableCell>{galpon.nombre_galpon}</TableCell>
              <TableCell>{galpon.CantidadGallinas}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditGalpon(galpon)}
                  style={{ marginRight: 10 }}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteGalpon(galpon.ID)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

