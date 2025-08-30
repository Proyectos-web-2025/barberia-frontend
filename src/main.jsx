// Importacion de la libreria para utilizar react-router
import { RouterProvider } from "react-router-dom";

// importaciones para renderizar la aplicacion
import React from "react";
import ReactDOM from "react-dom/client";
// Importa los componentes principales de React Query para configuración global del cliente
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


import "./index.css"; // importa styles de mi aplicativo
import router from "./routes/router"; // importar rutas de mis paginas

const queryClient = new QueryClient();
// Obtiene el elemento HTML donde se montará la aplicación React.
const root = document.getElementById("root");


/*
 Renderiza el router usando RouterProvider. Esto permite que toda la app tenga acceso a la navegación por rutas.
 Renderiza el provedor de react-query. Esto se encarga de manejar el caché, peticiones, reintentos, etc. de React Query
*/
ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
