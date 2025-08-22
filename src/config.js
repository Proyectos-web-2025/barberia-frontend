

/**
 * importacion de la configuracion del config , que tienen la configuracion de la ruta 
 */

// ruta local 
const LOCAL_API = import.meta.env.VITE_API_LOCAL;
// ruta de red 
const PUBLIC_API = import.meta.env.VITE_API_PUBLIC;

// Detecta si estás en localhost o en red
const BASE_URL = window.location.hostname === "localhost" ? LOCAL_API : PUBLIC_API;

export default BASE_URL;