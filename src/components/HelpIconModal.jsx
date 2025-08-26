// HelpIconModal.jsx
/**
 * Componente reutilizable de modal con icono
 */

import { useState , useEffect } from "react"; // Hook de React para manejar el estado del modal (abierto o cerrado).
import { motion, AnimatePresence } from "motion/react"; // libreria para manejar animaciones
import * as Icons from "react-icons/fa"; // importamos todos los iconos de fa disponibles

/**
 * Funcion para manejar modal.
 * Obtendra icono y mensaje y stylo por parametros
 */
function HelpIconModal({
  title = "HELP",
  iconName = "FaQuestionCircle", // icono por defecto
  message = "Default help message.", // mensaje por defecto
  styleIcon = "text-yellow-500 hover:text-yellow-300 text-3xl cursor-pointer", // estilo por defecto segun app
}) {
  
  /**
   * Variable isOpen y funcion SetIsOpen para manejar el esstado del modal
   */
  const [isOpen, setIsOpen] = useState(false); // estado inicial cerrado del modal
  const [isMobile, setIsMobile] = useState(false); // estado para abrir modal de forma diferente en celulares
  
  // efecto con condicional para el tamaño de la pantalla 
  useEffect(()=> {
    /** Revisamos el ancho de pantalla y lo guardamos coo esatdo inicial*/
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };
    handleResize();
    /** detectamos cambios en la pantalla  ya sea rotacion de celualr , etc*/
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  },[]);

  /**
   * Esta variable tiene el icono
   */
  const IconComponent = Icons[iconName];

  return (
    <div className="relative inline-block">
      {/* boton con icono  */}
      <button onClick={() => setIsOpen(true)} className={styleIcon}>
        <IconComponent />
      </button>

      {/* animacion para el modal*/}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fondo opaco con animación */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black pointer-events-none z-50"
            />

            {/* Modal flotante */}
             <motion.div
              initial={isMobile ? { y: "100%" } : { scale: 0.9, opacity: 0 }}
              animate={isMobile ? { y: "60%"} : { scale: 1, opacity: 1 }}
              exit={isMobile ? { y: "100%" } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`fixed z-50 bg-gray-200 rounded-lg p-6 shadow-[0_0_20px_rgba(255,215,0,0.6)] ${
                isMobile
                  ? "bottom-0 left-0 right-0 h-[70vh] overflow-y-auto"
                  : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg w-full max-h-58"
              }`}
            >
              <div className="w-full">
                <h2 className="text-xl font-bold mb-4 font-mono">{title}</h2>
                <p className="text-gray-800 mb-4 font-mono">{message}</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className=" font-mono mt-5 px-4 py-2 text-white font-semibold bg-gradient-to-r from-yellow-600 to-yellow-900 hover:from-yellow-500 hover:to-yellow-800 transition duration-300 rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HelpIconModal;
