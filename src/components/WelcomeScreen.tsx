import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Shield } from 'lucide-react';
import logoBrix from 'figma:asset/469c37be3526dc1d49e9eb7700555671b6112432.png';

interface WelcomeScreenProps {
  onStart: () => void;
  onAdminAccess?: () => void;
}

export function WelcomeScreen({ onStart, onAdminAccess }: WelcomeScreenProps) {
  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-[28px] shadow-2xl shadow-purple-300/30 p-8 md:p-12 border border-white/50">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-[28px] -z-10" />
      
      {/* Logo BRIX completo en la parte superior */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <img src={logoBrix} alt="BRIX" className="h-16 md:h-20" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center"
      >
        {/* Título principal: Satoshi 28px Bold #1C1C1E */}
        <h1 className="text-[28px] font-bold text-[#1C1C1E] mb-6" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Bienvenido a BRIX – Tu experiencia con la NSR-10
        </h1>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#33E1CE]/20 to-[#8D4CFF]/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/50 mb-6"
        >
          <Sparkles className="w-5 h-5 text-[#8D4CFF]" />
          <span className="text-sm text-gray-700" style={{ fontFamily: 'Manrope, sans-serif' }}>Diseño + Investigación</span>
        </motion.div>
      </motion.div>

      {/* Descripción: Manrope 15px Regular #555 */}
      <div className="space-y-4 mb-8 text-center max-w-lg mx-auto">
        <p className="text-[15px] font-normal text-[#555] leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
          BRIX es un proyecto que busca transformar el Título B de la NSR-10 en un recurso digital más claro, visual e interactivo. Esta encuesta nos ayudará a entender cómo navegas la norma y qué dificultades encuentras. Tu participación orienta el diseño del futuro producto digital. Solo te tomará 3 minutos.
        </p>
      </div>

      {/* Botón PRIMARIO: Satoshi 17px SemiBold */}
      <motion.button
        onClick={onStart}
        className="w-full bg-gradient-to-r from-[#33E1CE] to-[#8D4CFF] text-white py-4 px-8 rounded-[28px] relative overflow-hidden group backdrop-blur-sm text-[17px] font-semibold"
        style={{ 
          fontFamily: 'Satoshi, sans-serif',
          boxShadow: '0 2px 8px rgba(141, 76, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.08)'
        }}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(141, 76, 255, 0.25)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-xl"
          transition={{ duration: 0.3 }}
        />
        
        <span className="relative z-10 flex items-center justify-center gap-2">
          Comenzar
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </span>
      </motion.button>

      {/* Indicador de tiempo */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-[15px] font-normal text-[#555] mt-6"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        ⏱️ Tiempo estimado: 3 minutos
      </motion.p>

      {/* Botón TERCIARIO: Solo texto, muy discreto */}
      {onAdminAccess && (
        <motion.button
          onClick={onAdminAccess}
          className="w-full py-3 px-4 mt-6 text-[15px] font-normal text-gray-500 hover:text-gray-700 transition-colors duration-200"
          style={{ fontFamily: 'Manrope, sans-serif' }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Acceso administrativo
          </span>
        </motion.button>
      )}
    </div>
  );
}