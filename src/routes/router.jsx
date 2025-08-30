/**
 * archivo dedicado al manejo de las rutas de paginas para el aplicativo
 */

// importacion de la libreria react router
import { createBrowserRouter } from "react-router-dom";

// importaciones de paginas
import Login from "../pages/auth/login";
import Recovery from "../pages/auth/recovery";

// Define las rutas de tu aplicación con sus respectivos componentes.
const router = createBrowserRouter(
  [
    {
      // Ruta raíz ("/") que renderiza el componente App.
      path: "/",
      element: <Login />,
    },
    {
      // ruta para restablecer contraseña
      path: "/recovery",
      element: <Recovery />,
    },
  ],
  {
    basename: "/barberia-frontend", // útil para despliegues en GitHub Pages
  }
);

export default router;
