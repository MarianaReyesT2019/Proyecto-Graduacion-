import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Typography, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export const Bodega = () => {
  const BODEGA_ENDPOINT = import.meta.env.VITE_BODEGA;
  const [bodegas, setBodegas] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    BodegaID: "",
    CartonesHuevosMedianos: "",
    CartonesHuevosGrandes: "",
    CartonesHuevosExtraGrandes: "",
    CartonesHuevosJumbo: "",
    CartonesHuevosQuebrados: "",
    CantidadSacosConcentrado: "",
    FechaRecoleccion: ""
  });
  const [selectedBodegaId, setSelectedBodegaId] = useState(null);

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const fetchBodegas = async () => {
    try {
      const response = await fetch(BODEGA_ENDPOINT, {
        headers: {
          "Authorization": `Bearer ${getToken()}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBodegas(data);
      } else {
        console.error("Error getting bodegas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBodegas();
  }, []);

  const handleCreateBodega = async () => {
    try {
      let response;
      if (selectedBodegaId) {
        // Editar bodega existente
        response = await fetch(`${BODEGA_ENDPOINT}/${selectedBodegaId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Crear nueva bodega
        response = await fetch(BODEGA_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify(formData)
        });
      }
      if (response.ok) {
        fetchBodegas();
        setOpenForm(false);
        setSelectedBodegaId(null);
        setFormData({
          BodegaID: "",
          CartonesHuevosMedianos: "",
          CartonesHuevosGrandes: "",
          CartonesHuevosExtraGrandes: "",
          CartonesHuevosJumbo: "",
          CartonesHuevosQuebrados: "",
          CantidadSacosConcentrado: "",
          FechaRecoleccion: ""
        });
      } else {
        console.error("Error creating/editing bodega");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBodega = async (id) => {
    try {
      const response = await fetch(`${BODEGA_ENDPOINT}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      if (response.ok) {
        fetchBodegas();
      } else {
        console.error("Error deleting bodega");
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
      [name]: value
    });
  };

  const handleEditBodega = (bodega) => {
    setFormData({
      BodegaID: bodega.BodegaID,
      CartonesHuevosMedianos: bodega.CartonesHuevosMedianos,
      CartonesHuevosGrandes: bodega.CartonesHuevosGrandes,
      CartonesHuevosExtraGrandes: bodega.CartonesHuevosExtraGrandes,
      CartonesHuevosJumbo: bodega.CartonesHuevosJumbo,
      CartonesHuevosQuebrados: bodega.CartonesHuevosQuebrados,
      CantidadSacosConcentrado: bodega.CantidadSacosConcentrado,
      FechaRecoleccion: bodega.FechaRecoleccion
    });
    setSelectedBodegaId(bodega.BodegaID);
    setOpenForm(true);
  };

  return (
    <Box>
      <Typography variant="h3" gutterBottom style={{ margin: 15 }}>
        Bodega
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenForm} style={{ margin: 20 }}>
        Crear Bodega
      </Button>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>{selectedBodegaId ? 'Editar' : 'Crear'} Bodega</DialogTitle>
        <DialogContent>
          <TextField
            label="ID Bodega"
            name="BodegaID"
            value={formData.BodegaID}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cartones Huevos Medianos"
            name="CartonesHuevosMedianos"
            value={formData.CartonesHuevosMedianos}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cartones Huevos Grandes"
            name="CartonesHuevosGrandes"
            value={formData.CartonesHuevosGrandes}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cartones Huevos Extra Grandes"
            name="CartonesHuevosExtraGrandes"
            value={formData.CartonesHuevosExtraGrandes}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cartones Huevos Jumbo"
            name="CartonesHuevosJumbo"
            value={formData.CartonesHuevosJumbo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cartones Huevos Quebrados"
            name="CartonesHuevosQuebrados"
            value={formData.CartonesHuevosQuebrados}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad Sacos Concentrado"
            name="CantidadSacosConcentrado"
            value={formData.CantidadSacosConcentrado}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha de Recolección"
            name="FechaRecoleccion"
            type="date"
            value={formData.FechaRecoleccion}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button onClick={handleCreateBodega} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
      <Table style={{ margin: 15, width: 1500}}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Huevos Medianos</TableCell>
            <TableCell>Huevos Grandes</TableCell>
            <TableCell>Huevos Extra Grandes</TableCell>
            <TableCell>Huevos Jumbo</TableCell>
            <TableCell>Huevos Quebrados</TableCell>
            <TableCell>Sacos Concentrado</TableCell>
            <TableCell>Fecha de Recolección</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bodegas.map((bodega) => (
            <TableRow key={bodega.BodegaID}>
              <TableCell>{bodega.BodegaID}</TableCell>
              <TableCell>{bodega.CartonesHuevosMedianos}</TableCell>
              <TableCell>{bodega.CartonesHuevosGrandes}</TableCell>
              <TableCell>{bodega.CartonesHuevosExtraGrandes}</TableCell>
              <TableCell>{bodega.CartonesHuevosJumbo}</TableCell>
              <TableCell>{bodega.CartonesHuevosQuebrados}</TableCell>
              <TableCell>{bodega.CantidadSacosConcentrado}</TableCell>
              <TableCell>{bodega.FechaRecoleccion}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditBodega(bodega)} style={{ marginRight: 10 }}>
                  Editar
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteBodega(bodega.BodegaID)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
