// Importacion de la libreria para utilizar react-router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

// importaciones para renderizar la aplicacion
import React from "react";
import ReactDOM from "react-dom/client";

import './index.css'
import App from './App.jsx'

// Define las rutas de tu aplicación con sus respectivos componentes.
const router = createBrowserRouter(
  [
    {
      // Ruta raíz ("/") que renderiza el componente App.
      path: "/",
      element: <App />,
    },
  ],
  {
    /**
     * "basename" especifica la base del path cuando se despliega en una subcarpeta,
     * en GitHub Pages dentro de /barberia-frontend.
     */
    basename: "/barberia-frontend",
  }
);

// Obtiene el elemento HTML donde se montará la aplicación React.
const root = document.getElementById("root");


// Renderiza el router usando RouterProvider.
// Esto permite que toda la app tenga acceso a la navegación por rutas.
ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);
