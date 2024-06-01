import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export const Gallinas = () => {
  const GALLINAS_ENDPOINT = import.meta.env.VITE_GALLINAS;
  const [gallinas, setGallinas] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    ID: "",
    cantidad_gallinas_activas: "",
    cantidad_gallinas_desactivas: "",
  });
  const [selectedGallinaId, setSelectedGallinaId] = useState(null);

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const fetchGallinas = async () => {
    try {
      const response = await fetch(GALLINAS_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setGallinas(data);
      } else {
        console.error("Error al obtener las gallinas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGallinas();
  }, []);

  const handleCreateGallina = async () => {
    try {
      const response = await fetch(GALLINAS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchGallinas();
        setOpenForm(false);
        setFormData({
          ID: "",
          cantidad_gallinas_activas: "",
          cantidad_gallinas_desactivas: "",
        });
      } else {
        console.error("Error creando la gallina");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateGallina = async () => {
    try {
      const response = await fetch(`${GALLINAS_ENDPOINT}/${selectedGallinaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchGallinas();
        setOpenForm(false);
        setSelectedGallinaId(null);
        setFormData({
          ID: "",
          cantidad_gallinas_activas: "",
          cantidad_gallinas_desactivas: "",
        });
      } else {
        console.error("Error actualizando la gallina");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGallina = async (id) => {
    try {
      const response = await fetch(`${GALLINAS_ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.ok) {
        fetchGallinas();
      } else {
        console.error("Error eliminando la gallina");
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

  const handleEditGallina = (gallina) => {
    setFormData({
      ID: gallina.ID,
      cantidad_gallinas_activas: gallina.cantidad_gallinas_activas,
      cantidad_gallinas_desactivas: gallina.cantidad_gallinas_desactivas,
    });
    setSelectedGallinaId(gallina.ID);
    setOpenForm(true);
  };

  return (
    <Box>
      <Typography variant="h3" gutterBottom style={{ margin: 15 }}>
        Gallinas
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenForm} style={{ margin: 20 }}>
        Crear Gallina
      </Button>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>
          {selectedGallinaId ? "Editar" : "Crear"} Gallina
        </DialogTitle>
        <DialogContent>
          <TextField
            label="ID"
            name="ID"
            value={formData.ID}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad Gallinas Activas"
            name="cantidad_gallinas_activas"
            value={formData.cantidad_gallinas_activas}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad Gallinas Desactivas"
            name="cantidad_gallinas_desactivas"
            value={formData.cantidad_gallinas_desactivas}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button
            onClick={selectedGallinaId ? handleUpdateGallina : handleCreateGallina}
            color="primary"
          >
            {selectedGallinaId ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
      <Table style={{ margin: 20, width: 1880 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cantidad Gallinas Activas</TableCell>
            <TableCell>Cantidad Gallinas Desactivas</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gallinas.map((gallina) => (
            <TableRow key={gallina.ID}>
                <TableCell>{gallina.ID}</TableCell>
                <TableCell>{gallina.cantidad_gallinas_activas}</TableCell>
                <TableCell>{gallina.cantidad_gallinas_desactivas}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditGallina(gallina)}
                  style={{ marginRight: 10 }}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteGallina(gallina.ID)}
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

