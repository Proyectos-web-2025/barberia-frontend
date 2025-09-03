/**
 * archivo dedicado al manejo de las rutas de paginas para el aplicativo
 */

// importacion de la libreria react router
import { createBrowserRouter } from "react-router-dom";

// importacion de proteccion de rutas
import ProtectedRoute from "../utils/ProtectedRoute";

// importaciones de paginas
import Login from "../pages/auth/login";
import Recovery from "../pages/auth/recovery";
import Header from "../pages/admin/Dashboard";
import Header2 from "../pages/barber/dashboard";

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
      path: "/admin",
      element: (
        <ProtectedRoute allowedRoles={[1]}>
          <Header />
        </ProtectedRoute>
      ),
    },
    {
      // ruta para  barber
      path: "/barber",
      element: (
        <ProtectedRoute allowedRoles={[2]}>
          <Header2 />
        </ProtectedRoute>
      ),
    },
  ],
  {
    basename: "/barberia-frontend", // útil para despliegues en GitHub Pages
  }
);

export default router;
