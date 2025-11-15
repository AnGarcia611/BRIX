import { useState } from 'react';
import { motion } from 'motion/react';
import { XCircle, MinusCircle, Circle, CheckCircle, BadgeCheck } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface QuestionStepperProps {
  question: string;
  labels: string[];
  onAnswer: (value: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export function QuestionStepper({ question, labels, onAnswer, currentQuestion, totalQuestions }: QuestionStepperProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedValue !== null) {
      onAnswer(labels[selectedValue - 1]);
    }
  };

  // Configuración de iconos para cada nivel
  const icons = [XCircle, MinusCircle, Circle, CheckCircle, BadgeCheck];

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-[28px] shadow-2xl shadow-purple-300/30 p-8 md:p-12 border border-white/50">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-[28px] -z-10" />
      
      <ProgressBar current={currentQuestion} total={totalQuestions} />
      
      {/* Pregunta: Satoshi 22px Bold #1C1C1E */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12 text-center text-[22px] font-bold text-[#1C1C1E]"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        {question}
      </motion.h2>

      {/* Stepper horizontal */}
      <div className="mb-8">
        {/* Círculos táctiles */}
        <div className="flex justify-between items-center mb-6 px-4 md:px-8">
          {labels.map((label, index) => {
            const Icon = icons[index];
            const isSelected = selectedValue === index + 1;
            
            return (
              <motion.button
                key={index}
                onClick={() => setSelectedValue(index + 1)}
                className="relative flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  width: '52px',
                  height: '52px',
                  border: isSelected ? '2px solid transparent' : '2px solid #E5E5E5',
                  backgroundColor: isSelected ? '#F0F7FF' : '#FFFFFF',
                  boxShadow: isSelected 
                    ? '0 4px 12px rgba(141, 76, 255, 0.25), 0 2px 6px rgba(51, 225, 206, 0.15)'
                    : '0 2px 8px rgba(0, 0, 0, 0.06)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.08 }}
                aria-label={label}
                aria-pressed={isSelected}
              >
                {/* Borde gradiente para estado activo */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-full p-[2px]"
                    style={{
                      background: 'linear-gradient(135deg, #33E1CE 0%, #8D4CFF 100%)',
                      zIndex: -1,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: '#F0F7FF' }}
                    />
                  </motion.div>
                )}

                {/* Ícono */}
                <Icon 
                  className={`w-6 h-6 transition-colors ${
                    isSelected ? 'text-[#8D4CFF]' : 'text-gray-400'
                  }`}
                  strokeWidth={2}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Línea conectora entre círculos */}
        <div className="relative h-1 mx-auto mb-8" style={{ width: 'calc(100% - 8rem)' }}>
          <div className="absolute inset-0 bg-gray-200 rounded-full" />
          {selectedValue !== null && (
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                background: 'linear-gradient(to right, #33E1CE, #8D4CFF)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${((selectedValue - 1) / (labels.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )}
        </div>

        {/* Texto del nivel seleccionado - Manrope 16px Medium */}
        <motion.div
          className="text-center min-h-[24px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {selectedValue !== null && (
            <motion.p
              key={selectedValue}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-[16px] font-medium text-[#1E1E1E]"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {labels[selectedValue - 1]}
            </motion.p>
          )}
        </motion.div>
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
