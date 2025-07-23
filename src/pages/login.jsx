/**
 * archivo dedicado al login
 */

function Login() {
  return (
    <div className="h-screen flex items-center justify-center ">
      {/* Formulario de login */}
      <div className="w-full max-w-xs">
        
        {/* Título del login */}
        <h1 className="text-5xl text-white font-bold text-center mb-14 font-mono">
          Login
        </h1>

        {/* Campo de usuario */}
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-amber-50 text-base mb-1 tracking-wide"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
            placeholder="Enter your username"
          />
        </div>

        {/* Campo de contraseña */}
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-amber-50 text-base mb-1 tracking-wide"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Botón de login */}
        <button className="w-full py-2 text-white font-semibold bg-gradient-to-r from-yellow-600 to-yellow-900 hover:from-yellow-500 hover:to-yellow-800 transition duration-300 rounded">
          ENTER...
        </button>
      </div>
    </div>
  );
}

export default Login;
