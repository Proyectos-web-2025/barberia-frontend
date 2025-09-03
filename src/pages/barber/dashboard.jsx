
import React from "react";
import { Link } from "react-router-dom";

const Header2 = () => {
  return (
     <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow">
    <h1 className="text-xl font-bold">Panel de Administración</h1>
    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Cerrar sesión</button>
  </header>
  );
};

export default Header2;
