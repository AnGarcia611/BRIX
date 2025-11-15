import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import isologo from 'figma:asset/ba49dfa6856e5c46796ea1e65e26fd53f21677b4.png';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export function AdminLogin({ onLoginSuccess, onBack }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Credenciales de administrador (en producción deberían estar en el backend)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'brix2024';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLoginSuccess();
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-[28px] shadow-2xl shadow-purple-300/30 p-8 md:p-12 border border-white/50">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-[28px] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Icono de admin */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-[#FFFFF] to-[#FFFFF] rounded-full flex items-center justify-center shadow-lg bg-[rgba(251,251,251,0)]">
            <img src={isologo} alt="BRIX Admin" className="w-12 h-12" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-[28px] font-bold text-[#1C1C1E] text-center mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Panel de Administrador
        </h1>
        
        <p className="text-[15px] font-normal text-[#555] text-center mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Accede para ver y descargar las respuestas
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo usuario */}
          <div>
            <label className="block text-[15px] font-medium text-[#1C1C1E] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-white/60 rounded-[20px] focus:border-purple-300 focus:outline-none transition-all text-[16px] font-normal"
                style={{ fontFamily: 'Manrope, sans-serif' }}
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
          </div>

          {/* Campo contraseña */}
          <div>
            <label className="block text-[15px] font-medium text-[#1C1C1E] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white/50 backdrop-blur-sm border-2 border-white/60 rounded-[20px] focus:border-purple-300 focus:outline-none transition-all text-[16px] font-normal"
                style={{ fontFamily: 'Manrope, sans-serif' }}
                placeholder="Ingresa tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-100/80 backdrop-blur-sm border border-red-200 rounded-[16px] text-center"
            >
              <p className="text-[14px] text-red-600" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {error}
              </p>
            </motion.div>
          )}

          {/* Botones */}
          <div className="space-y-3 pt-4">
            {/* Botón PRIMARIO: Iniciar Sesión */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-[#33E1CE] to-[#8D4CFF] text-white py-4 px-8 rounded-[28px] text-[17px] font-semibold"
              style={{ 
                fontFamily: 'Satoshi, sans-serif',
                boxShadow: '0 2px 8px rgba(141, 76, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.08)'
              }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(141, 76, 255, 0.25)" }}
              whileTap={{ scale: 0.98 }}
            >
              Iniciar Sesión
            </motion.button>

            {/* Botón SECUNDARIO: Volver */}
            <motion.button
              type="button"
              onClick={onBack}
              className="w-full bg-gray-100/70 backdrop-blur-sm text-gray-700 py-3 px-8 rounded-[28px] border border-gray-200 hover:bg-gray-100 transition-all text-[15px] font-normal"
              style={{ fontFamily: 'Manrope, sans-serif' }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Volver
            </motion.button>
          </div>
        </form>

        {/* Credenciales de demo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-purple-100/50 backdrop-blur-sm rounded-[16px] border border-purple-200/50"
        >
          <p className="text-[13px] text-gray-600 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
            <strong>Credenciales de prueba:</strong><br />
            Usuario: <code className="bg-white/50 px-2 py-1 rounded">admin</code><br />
            Contraseña: <code className="bg-white/50 px-2 py-1 rounded">brix2024</code>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}