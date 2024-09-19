import React from "react";

export const Home = () => {
  return (
    <div style={{ textAlign: "center", position: "relative" }}>
    <h1 style={{
      marginTop: 0,  // Elimina el margen superior para centrar mejor
      fontFamily: 'Times-New-Roman', 
      position: "absolute",  
      top: "40%",  
      left: "50%", 
      transform: "translate(-50%, -50%)", 
      color: "white",  
      zIndex: 5  
    }}>
      ¡Bienvenido a Granja el Porvenir!
    </h1>
    
    <img
      src="./../../public/galinas.jpg"
      alt="Descripción de la imagen"
      style={{
        width: "1500px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
        borderRadius: "8px", 
        opacity: "0.6", 
        position: "relative",
        zIndex: 1  // Asegura que la imagen esté por detrás del texto
      }}
    />
  </div>
  
  
  );
};
