import React from "react";

export const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginTop: 50, fontFamily: 'Times-New-Roman' }}>¡Bienvenido a Granja el Porvenir!</h1>
      <img
        src="./../../public/HomeImage.jpg"
        alt="Descripción de la imagen"
        style={{
          width: "1100px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
          borderRadius: "8px", 
        }}
      />
    </div>
  );
};
