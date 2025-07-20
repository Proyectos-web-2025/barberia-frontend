/**
 * archivo dedicado al manejo de las rutas de paginas para el aplicativo
 */

// importacion de la libreria react router
import { createBrowserRouter, RouterProvider } from "react-router";

// importaciones de paginas
import Login from "../pages/login";

// Define las rutas de tu aplicación con sus respectivos componentes.
const router = createBrowserRouter(
  [
    {
      // Ruta raíz ("/") que renderiza el componente App.
      path: "/",
      element: <Login />,
    },
  ],
  {
    basename: "/barberia-frontend", // útil para despliegues en GitHub Pages
  }
);

export default router;
