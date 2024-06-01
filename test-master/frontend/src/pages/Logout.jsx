import { Button, Card, CardContent, Typography, Box } from "@mui/material";

export const Logout = () => {
  const handleLogout = () => {
    fetch('/api/v1/logout', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        // Remove token from sessionStorage and redirect to login
        sessionStorage.removeItem('token');
        window.location.replace('/');
      }
    })
    .catch((error) => {
      console.error('Logout error:', error);
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ minWidth: 300, maxWidth: 600 }}>
        <CardContent style={{ margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            ¡Hasta luego!
          </Typography>
          <Typography variant="body1">
            Vuelve a usar nuestro sistema pronto!
          </Typography>
          <Button onClick={handleLogout} variant="contained" color="primary" sx={{ marginTop: 5 }}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
