import { useState } from "react";
import { TextField, Button, Box, Typography, Select, MenuItem } from "@mui/material";

export const Register = () => {
    const REGISTER_ENDPOINT = import.meta.env.VITE_REGISTER_ENDPOINT; // REGISTER_ENDPOINT para el registro

    const [usuario, setUsuario] = useState({
        Nombre: "",
        Apellido: "",
        Email: "",
        PasswordHash: "",
        Rol: "Empleado", // Opción predeterminada
        Activo: true
    });

    const valueHasChanged = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    }

    const registerClick = async (e) => {
        e.preventDefault();

        try {
            let response = await fetch(REGISTER_ENDPOINT, {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                alert("Registered user successfully");
                // Puedes redirigir al usuario a otra página o hacer algo más después del registro.
            } else {
                alert("Error registering user");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >
            <Box
                component="form"
                sx={{
                    width: "300px",
                    p: 2,
                    border: "1px solid",
                    borderRadius: "5px",
                    boxShadow: 3,
                    bgcolor: "background.paper"
                }}
                onSubmit={registerClick}
            >
                <Typography variant="h5" gutterBottom>
                    User register
                </Typography>
                <TextField
                    id="Nombre"
                    name="Nombre"
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={usuario.Nombre}
                    onChange={valueHasChanged}
                />
                <TextField
                    id="Apellido"
                    name="Apellido"
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={usuario.Apellido}
                    onChange={valueHasChanged}
                />
                <TextField
                    id="Email"
                    name="Email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={usuario.Email}
                    onChange={valueHasChanged}
                />
                <TextField
                    id="PasswordHash"
                    name="PasswordHash"
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={usuario.PasswordHash}
                    onChange={valueHasChanged}
                />
                <Select
                    id="Rol"
                    name="Rol"
                    label="Rol"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={usuario.Rol}
                    onChange={valueHasChanged}
                >
                    <MenuItem value="Empleado">Empleado</MenuItem>
                    <MenuItem value="Administrador">Administrador</MenuItem>
                </Select>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Registrar
                </Button>
            </Box>
        </Box>
    );
}

export default Register;
