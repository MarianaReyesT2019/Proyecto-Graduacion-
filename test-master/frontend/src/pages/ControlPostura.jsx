import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Typography, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export const ControlPostura = () => {
  const CONTROL_POSTURA_ENDPOINT = import.meta.env.VITE_CONTROL_POSTURA_ENDPOINT;
  const [controlPostura, setControlPostura] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    ControlPosturaID: "",
    CantidadHuevosMedianos: "",
    CantidadHuevosGrandes: "",
    CantidadHuevosExtraGrandes: "",
    CantidadHuevosJumbo: "",
    CantidadHuevosQuebrados: "",
    FechaRecoleccion: ""
  });
  const [selectedControlPosturaId, setSelectedControlPosturaId] = useState(null);

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const fetchControlPostura = async () => {
    try {
      const response = await fetch(CONTROL_POSTURA_ENDPOINT, {
        headers: {
          "Authorization": `Bearer ${getToken()}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setControlPostura(data);
      } else {
        console.error("Error getting control postura");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchControlPostura();
  }, []);

  const handleCreateControlPostura = async () => {
    try {
      let response;
      if (selectedControlPosturaId) {
        // Editar control de postura existente
        response = await fetch(`${CONTROL_POSTURA_ENDPOINT}/${selectedControlPosturaId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Crear nuevo control de postura
        response = await fetch(CONTROL_POSTURA_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify(formData)
        });
      }
      if (response.ok) {
        fetchControlPostura();
        setOpenForm(false);
        setSelectedControlPosturaId(null);
        setFormData({
          ControlPosturaID: "",
          CantidadHuevosMedianos: "",
          CantidadHuevosGrandes: "",
          CantidadHuevosExtraGrandes: "",
          CantidadHuevosJumbo: "",
          CantidadHuevosQuebrados: "",
          FechaRecoleccion: ""
        });
      } else {
        console.error("Error creating/editing control postura");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteControlPostura = async (id) => {
    try {
      const response = await fetch(`${CONTROL_POSTURA_ENDPOINT}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      if (response.ok) {
        fetchControlPostura();
      } else {
        console.error("Error deleting control postura");
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

  const handleEditControlPostura = (controlpostura) => {
    setFormData({
      ControlPosturaID: controlpostura.ControlPosturaID,
      CantidadHuevosMedianos: controlpostura.CantidadHuevosMedianos,
      CantidadHuevosGrandes: controlpostura.CantidadHuevosGrandes,
      CantidadHuevosExtraGrandes: controlpostura.CantidadHuevosExtraGrandes,
      CantidadHuevosJumbo: controlpostura.CantidadHuevosJumbo,
      CantidadHuevosQuebrados: controlpostura.CantidadHuevosQuebrados,
      FechaRecoleccion: controlpostura.FechaRecoleccion
    });
    setSelectedControlPosturaId(controlpostura.ControlPosturaID);
    setOpenForm(true);
  };

  return (
    <Box>
      <Typography variant="h3" gutterBottom style={{ margin: 15 }}>
        Control Postura
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenForm} style={{ margin: 20 }}>
        Crear Control de Postura
      </Button>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>{selectedControlPosturaId ? 'Editar' : 'Crear'} Control de Postura</DialogTitle>
        <DialogContent>
          <TextField
            label="ID Control Postura"
            name="ControlPosturaID"
            value={formData.ControlPosturaID}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad Huevos Medianos"
            name="CantidadHuevosMedianos"
            value={formData.CantidadHuevosMedianos}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad Huevos Grandes"
            name="CantidadHuevosGrandes"
            value={formData.CantidadHuevosGrandes}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad Huevos Extra Grandes"
            name="CantidadHuevosExtraGrandes"
            value={formData.CantidadHuevosExtraGrandes}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad Huevos Jumbo"
            name="CantidadHuevosJumbo"
            value={formData.CantidadHuevosJumbo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad Huevos Quebrados"
            name="CantidadHuevosQuebrados"
            value={formData.CantidadHuevosQuebrados}
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
          <Button onClick={handleCreateControlPostura} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
      <Table style={{ margin: 20, width: 1880 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cantidad Huevos M</TableCell>
            <TableCell>Cantidad Huevos G</TableCell>
            <TableCell>Cantidad Huevos EG</TableCell>
            <TableCell>Cantidad Huevos J</TableCell>
            <TableCell>Cantidad Huevos Q</TableCell>
            <TableCell>Fecha de Recolección</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {controlPostura.map((controlpostura) => (
            <TableRow key={controlpostura.ControlPosturaID}>
              <TableCell>{controlpostura.ControlPosturaID}</TableCell>
              <TableCell>{controlpostura.CantidadHuevosMedianos}</TableCell>
              <TableCell>{controlpostura.CantidadHuevosGrandes}</TableCell>
              <TableCell>{controlpostura.CantidadHuevosExtraGrandes}</TableCell>
              <TableCell>{controlpostura.CantidadHuevosJumbo}</TableCell>
              <TableCell>{controlpostura.CantidadHuevosQuebrados}</TableCell>
              <TableCell>{controlpostura.FechaRecoleccion}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditControlPostura(controlpostura)} style={{ marginRight: 10 }}>
                  Editar
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteControlPostura(controlpostura.ControlPosturaID)}>
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
