import { motion } from 'motion/react';
import { XCircle, MinusCircle, Circle, CheckCircle, BadgeCheck } from 'lucide-react';

export function ScaleVisualization() {
  const scaleItems = [
    {
      number: 1,
      label: 'Muy en desacuerdo',
      icon: XCircle,
      background: '#F4F4F5',
      iconColor: 'text-gray-600',
      intensity: 0.2,
    },
    {
      number: 2,
      label: 'En desacuerdo',
      icon: MinusCircle,
      background: '#F5F5F7',
      iconColor: 'text-gray-500',
      intensity: 0.4,
    },
    {
      number: 3,
      label: 'Neutral',
      icon: Circle,
      background: '#FFFFFF',
      iconColor: 'text-gray-400',
      intensity: 0.6,
    },
    {
      number: 4,
      label: 'De acuerdo',
      icon: CheckCircle,
      background: '#EDF9F3',
      iconColor: 'text-green-600',
      intensity: 0.8,
    },
    {
      number: 5,
      label: 'Muy de acuerdo',
      icon: BadgeCheck,
      background: '#EEF2FF',
      iconColor: 'text-[#8D4CFF]',
      intensity: 1,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 p-6 md:p-8 bg-white rounded-[24px] border border-gray-200 shadow-sm"
      style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)' }}
    >
      {/* Título: Satoshi 28px Bold */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[28px] font-bold text-[#1C1C1E] mb-3 text-center"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        Escala de valoración
      </motion.h3>

      {/* Subtítulo: Manrope 17px Medium */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[17px] font-medium text-[#555] mb-8 text-center"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        ¿Qué significan las opciones del 1 al 5?
      </motion.p>

      {/* Grid de tarjetas - Responsive: Mobile = 1 columna, Desktop = 5 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {scaleItems.map((item, index) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.4 + index * 0.08,
              duration: 0.4,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="relative rounded-[24px] p-6 flex flex-col items-center justify-center text-center gap-3 border border-gray-200/50 min-h-[160px]"
            style={{ 
              backgroundColor: item.background,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.08)'
            }}
          >
            {/* Ícono: 24px */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 + index * 0.08, type: 'spring', stiffness: 300 }}
            >
              <item.icon className={`w-6 h-6 ${item.iconColor}`} strokeWidth={2} />
            </motion.div>

            {/* Número: Satoshi 26px Bold - Color gris #333333 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.08 }}
            >
              <span
                className="text-[26px] font-bold"
                style={{ fontFamily: 'Satoshi, sans-serif', color: '#333333' }}
              >
                {item.number}
              </span>
            </motion.div>

            {/* Label: Manrope 15px Medium - Mejor encaje */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.08 }}
              className="text-[15px] font-medium text-[#1C1C1E] leading-tight px-2"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {item.label}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}