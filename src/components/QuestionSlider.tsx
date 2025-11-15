import { useState } from 'react';
import { motion } from 'motion/react';
import { XCircle, MinusCircle, Circle, CheckCircle, BadgeCheck } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface QuestionSliderProps {
  question: string;
  labels: string[];
  onAnswer: (value: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export function QuestionSlider({ question, labels, onAnswer, currentQuestion, totalQuestions }: QuestionSliderProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedValue !== null) {
      onAnswer(labels[selectedValue - 1]);
    }
  };

  // Configuración de las tarjetas Likert
  const scaleCards = [
    {
      number: 1,
      label: labels[0],
      icon: XCircle,
      background: '#F4F4F5',
      iconColor: 'text-gray-600',
    },
    {
      number: 2,
      label: labels[1],
      icon: MinusCircle,
      background: '#F5F5F7',
      iconColor: 'text-gray-500',
    },
    {
      number: 3,
      label: labels[2],
      icon: Circle,
      background: '#FAFAFA',
      iconColor: 'text-gray-400',
    },
    {
      number: 4,
      label: labels[3],
      icon: CheckCircle,
      background: '#EDF9F3',
      iconColor: 'text-green-600',
    },
    {
      number: 5,
      label: labels[4],
      icon: BadgeCheck,
      background: '#EEF2FF',
      iconColor: 'text-[#8D4CFF]',
    },
  ];

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-[28px] shadow-2xl shadow-purple-300/30 p-8 md:p-12 border border-white/50">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-[28px] -z-10" />
      
      <ProgressBar current={currentQuestion} total={totalQuestions} />
      
      {/* Pregunta: Manrope 20px Medium #1C1C1E */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 text-center text-[20px] font-medium text-[#1C1C1E]"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        {question}
      </motion.h2>

      {/* Tarjetas Likert seleccionables */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {scaleCards.map((card, index) => (
          <motion.button
            key={card.number}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.2 + index * 0.08,
              duration: 0.4,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            onClick={() => setSelectedValue(card.number)}
            className={`relative rounded-[24px] p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[180px] transition-all duration-300 ${
              selectedValue === card.number
                ? 'border-2 shadow-lg'
                : 'border border-gray-200/50 shadow-sm'
            }`}
            style={{
              backgroundColor: card.background,
              borderImageSource: selectedValue === card.number 
                ? 'linear-gradient(135deg, #33E1CE 0%, #8D4CFF 100%)'
                : 'none',
              borderImageSlice: selectedValue === card.number ? 1 : 0,
              boxShadow: selectedValue === card.number
                ? '0 8px 20px rgba(141, 76, 255, 0.25), 0 2px 8px rgba(51, 225, 206, 0.2)'
                : '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.08)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label={card.label}
            aria-pressed={selectedValue === card.number}
          >
            {/* Borde gradiente para estado activo */}
            {selectedValue === card.number && (
              <motion.div
                className="absolute inset-0 rounded-[24px] p-[2px]"
                style={{
                  background: 'linear-gradient(135deg, #33E1CE 0%, #8D4CFF 100%)',
                  zIndex: -1,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-full h-full rounded-[22px]"
                  style={{ backgroundColor: card.background }}
                />
              </motion.div>
            )}

            {/* Ícono: 24px */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.08, type: 'spring', stiffness: 300 }}
            >
              <card.icon className={`w-6 h-6 ${card.iconColor}`} strokeWidth={2} />
            </motion.div>

            {/* Número: Satoshi 26px Bold - Color gris #333333 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.08 }}
            >
              <span
                className="text-[26px] font-bold"
                style={{ fontFamily: 'Satoshi, sans-serif', color: '#333333' }}
              >
                {card.number}
              </span>
            </motion.div>

            {/* Label: Manrope 16px Medium */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.08 }}
              className="text-[16px] font-medium text-[#1C1C1E] leading-tight px-2"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {card.label}
            </motion.p>
          </motion.button>
        ))}
      </div>

      {/* Botón continuar: Satoshi 17px SemiBold */}
      <motion.button
        onClick={handleSubmit}
        disabled={selectedValue === null}
        className={`w-full py-4 px-8 rounded-[28px] relative overflow-hidden group shadow-lg text-[17px] font-semibold transition-opacity ${
          selectedValue === null
            ? 'opacity-50 cursor-not-allowed'
            : 'opacity-100'
        }`}
        style={{
          fontFamily: 'Satoshi, sans-serif',
          background: 'linear-gradient(to right, #33E1CE, #8D4CFF)',
          color: 'white',
        }}
        whileHover={selectedValue !== null ? { scale: 1.02 } : {}}
        whileTap={selectedValue !== null ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <span className="relative z-10">Continuar</span>
      </motion.button>
    </div>
  );
}