import { motion } from 'motion/react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      {/* Contador de preguntas con glassmorphism */}
      <div className="flex justify-between items-center mb-3 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/50">
        {/* Texto: Manrope 15px Regular #555 */}
        <span className="text-[15px] font-normal text-[#555]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Pregunta {current} de {total}
        </span>
        {/* Porcentaje: Manrope 15px Medium #333333 - GRIS SIEMPRE */}
        <span className="text-[15px] font-medium text-[#333333]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Barra de progreso con glassmorphism */}
      <div className="relative h-2 bg-white/40 backdrop-blur-sm rounded-full overflow-hidden border border-white/50">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#33E1CE] to-[#8D4CFF] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Glow effect en el borde */}
        <motion.div
          className="absolute top-0 h-full w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          style={{ left: `${percentage}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        />
      </div>

      {/* Puntos de progreso */}
      <div className="flex justify-between mt-3">
        {[...Array(total)].map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index < current
                ? 'bg-gradient-to-r from-[#33E1CE] to-[#8D4CFF] scale-110'
                : 'bg-gray-300'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: index < current ? 1.1 : 1 }}
            transition={{ delay: index * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}