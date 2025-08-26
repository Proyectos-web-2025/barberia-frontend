// src/components/MaskedSensitive.jsx

/**
 * archivo que tendra dos componentes , para enmascarar datos
 * mas que todo se utilizara para el restablecimiento de contraseñas 
 */


// Función para enmascarar correos
const maskEmail = (email) => {
  if (!email || !email.includes("@")) return email;

  const [local, domain] = email.split("@");
  const visible = local.slice(0, 4);
  const masked = "*".repeat(Math.max(local.length - 4, 1));

  return `${visible}${masked}@${domain}`;
};

// Componente para correos
export const MaskedEmail = ({ email, className = "" }) => {
  return (
    <span className={`text-gray-400 text-sm font-mono ${className}`}>
      {maskEmail(email)}
    </span>
  );
};

// Función para enmascarar teléfonos
const maskPhone = (phone) => {
  if (!phone || typeof phone !== "string") return phone;

  const visibleStart = phone.slice(0, 3);
  const visibleEnd = phone.slice(-2);
  const maskedLength = Math.max(phone.length - 5, 3);
  const masked = "*".repeat(maskedLength);

  return `${visibleStart}${masked}${visibleEnd}`;
};

// Componente para teléfonos
export const MaskedPhone = ({ phone, className = "" }) => {
  return (
    <span className={`text-gray-400 text-sm font-mono ${className}`}>
      {maskPhone(phone)}
    </span>
  );
};


