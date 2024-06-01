import React, { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Typography, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export const Ventas = () => {
  const VENTAS_ENDPOINT = import.meta.env.VITE_VENTAS;
  const [ventas, setVentas] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    CantidadCartonesHuevosMedianos: "",
    CantidadCartonesHuevosGrandes: "",
    CantidadCartonesHuevosExtraGrandes: "",
    CantidadCartonesHuevosJumbo: "",
    Fecha: "",
    Total: ""
  });
  const [selectedVentaId, setSelectedVentaId] = useState(null);

  useEffect(() => {
    fetchVentas();
  }, []);

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const fetchVentas = async () => {
    try {
      const response = await fetch(VENTAS_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setVentas(data);
      } else {
        console.error("Error al obtener las ventas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateVenta = async () => {
    try {
      const response = await fetch(VENTAS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchVentas();
        setOpenForm(false);
        setFormData({
          CantidadCartonesHuevosMedianos: "",
          CantidadCartonesHuevosGrandes: "",
          CantidadCartonesHuevosExtraGrandes: "",
          CantidadCartonesHuevosJumbo: "",
          Fecha: "",
          Total: ""
        });
      } else {
        console.error("Error creando la venta");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateVenta = async () => {
    try {
      const response = await fetch(`${VENTAS_ENDPOINT}/${selectedVentaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchVentas();
        setOpenForm(false);
        setSelectedVentaId(null);
        setFormData({
          CantidadCartonesHuevosMedianos: "",
          CantidadCartonesHuevosGrandes: "",
          CantidadCartonesHuevosExtraGrandes: "",
          CantidadCartonesHuevosJumbo: "",
          Fecha: "",
          Total: ""
        });
      } else {
        console.error("Error actualizando la venta");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteVenta = async (id) => {
    try {
      const response = await fetch(`${VENTAS_ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      if (response.ok) {
        fetchVentas();
      } else {
        console.error("Error eliminando la venta");
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

  const handleEditVenta = (venta) => {
    setFormData({
      CantidadCartonesHuevosMedianos: venta.CantidadCartonesHuevosMedianos,
      CantidadCartonesHuevosGrandes: venta.CantidadCartonesHuevosGrandes,
      CantidadCartonesHuevosExtraGrandes: venta.CantidadCartonesHuevosExtraGrandes,
      CantidadCartonesHuevosJumbo: venta.CantidadCartonesHuevosJumbo,
      Fecha: venta.Fecha,
      Total: venta.Total
    });
    setSelectedVentaId(venta.VentasID);
    setOpenForm(true);
  };

  return (
    <Box>
      <Typography variant="h3" gutterBottom style={{ margin: 15 }}>
        Ventas
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenForm} style={{ margin: 20 }}>
        Crear Venta
        </Button>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>{selectedVentaId ? "Editar" : "Crear"} Venta</DialogTitle>
        <DialogContent>
          <TextField
            label="Cantidad Cartones Huevos Medianos"
            name="CantidadCartonesHuevosMedianos"
            value={formData.CantidadCartonesHuevosMedianos}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad Cartones Huevos Grandes"
            name="CantidadCartonesHuevosGrandes"
            value={formData.CantidadCartonesHuevosGrandes}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad Cartones Huevos Extra Grandes"
            name="CantidadCartonesHuevosExtraGrandes"
            value={formData.CantidadCartonesHuevosExtraGrandes}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad Cartones Huevos Jumbo"
            name="CantidadCartonesHuevosJumbo"
            value={formData.CantidadCartonesHuevosJumbo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha"
            name="Fecha"
            type="date"
            value={formData.Fecha}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Total"
            name="Total"
            type="number"
            value={formData.Total}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button onClick={selectedVentaId ? handleUpdateVenta : handleCreateVenta} color="primary">
            {selectedVentaId ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
      <Table style={{ margin: 20, width: 1880 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cantidad Cartones Huevos Medianos</TableCell>
            <TableCell>Cantidad Cartones Huevos Grandes</TableCell>
            <TableCell>Cantidad Cartones Huevos Extra Grandes</TableCell>
            <TableCell>Cantidad Cartones Huevos Jumbo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ventas.map((venta) => (
            <TableRow key={venta.VentasID}>
              <TableCell>{venta.VentasID}</TableCell>
              <TableCell>{venta.CantidadCartonesHuevosMedianos}</TableCell>
              <TableCell>{venta.CantidadCartonesHuevosGrandes}</TableCell>
              <TableCell>{venta.CantidadCartonesHuevosExtraGrandes}</TableCell>
              <TableCell>{venta.CantidadCartonesHuevosJumbo}</TableCell>
              <TableCell>{venta.Fecha}</TableCell>
              <TableCell>{venta.Total}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditVenta(venta)} style={{ marginRight: 10 }}>
                  Editar
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteVenta(venta.VentasID)}>
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
