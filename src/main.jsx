// Importacion de la libreria para utilizar react-router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

// importaciones para renderizar la aplicacion
import React from "react";
import ReactDOM from "react-dom/client";

import './index.css' // importa styles de mi aplicativo

import router from "./routes/router"; // importar rutas de mis paginas


// Obtiene el elemento HTML donde se montará la aplicación React.
const root = document.getElementById("root");


// Renderiza el router usando RouterProvider.
// Esto permite que toda la app tenga acceso a la navegación por rutas.
ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);
