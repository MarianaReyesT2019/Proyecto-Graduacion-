import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

export const Login = () => {
  const LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT;

  const [usuario, setUsuario] = useState({
    Email: "",
    PasswordHash: ""
  });

  const valueHasChanged = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const loginClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      if (response.ok) {
        const data = await response.json();
        // Guarda el token en el almacenamiento local
        sessionStorage.setItem("token", data.token)
        alert("Successfully authenticated user");
      } else {
        alert("Authentication failed");
        console.log(response.json())
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          bgcolor: "background.paper",
          opacity: 0.9 
        }}
        onSubmit={loginClick}
      >
     
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          id="Email"
          name="Email"
          label="Email"
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Ingresar
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
