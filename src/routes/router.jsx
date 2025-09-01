/**
 * archivo dedicado al manejo de las rutas de paginas para el aplicativo
 */

// importacion de la libreria react router
import { createBrowserRouter } from "react-router-dom";

// importaciones de paginas
import Login from "../pages/auth/login";
import Recovery from "../pages/auth/recovery";
import DashboardAdmin from "../pages/admin/Dashboard"


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
    {
      // ruta para restablecer contraseña
      path: "/admin",
      element: <DashboardAdmin />,
    },
  ],
  {
    basename: "/barberia-frontend", // útil para despliegues en GitHub Pages
  }
);

export default router;
