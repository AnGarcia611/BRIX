import { useState } from 'react';
import { motion } from 'motion/react';
import { Video, BarChart3, Gamepad2, BookOpen, Image } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface ChipOption {
  icon: string;
  text: string;
}

interface QuestionMultiChipsProps {
  question: string;
  subtitle?: string;
  options: ChipOption[];
  maxSelections: number;
  onAnswer: (value: string[]) => void;
  currentQuestion: number;
  totalQuestions: number;
}

// Mapeo de iconos
const getIcon = (text: string) => {
  if (text.includes('Videos')) return Video;
  if (text.includes('Infografías')) return BarChart3;
  if (text.includes('Interacciones')) return Gamepad2;
  if (text.includes('Texto')) return BookOpen;
  if (text.includes('Diagramas')) return Image;
  return BookOpen;
};

export function QuestionMultiChips({ 
  question, 
  subtitle,
  options, 
  maxSelections,
  onAnswer, 
  currentQuestion, 
  totalQuestions 
}: QuestionMultiChipsProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (text: string) => {
    if (selectedOptions.includes(text)) {
      setSelectedOptions(selectedOptions.filter(opt => opt !== text));
    } else if (selectedOptions.length < maxSelections) {
      setSelectedOptions([...selectedOptions, text]);
    }
  };

  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      onAnswer(selectedOptions);
    }
  };

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-[28px] shadow-2xl shadow-purple-300/30 p-8 md:p-12 border border-white/50">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-[28px] -z-10" />
      
      <ProgressBar current={currentQuestion} total={totalQuestions} />
      
      <div className="text-center mb-8">
        {/* Pregunta: Manrope 20px Medium #1C1C1E */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[20px] font-medium text-[#1C1C1E] mb-2"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          {question}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[15px] font-normal text-[#555]"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Contador de selección */}
      <motion.div
        className="flex justify-center gap-2 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[...Array(maxSelections)].map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index < selectedOptions.length
                ? 'bg-gradient-to-r from-[#33E1CE] to-[#8D4CFF] scale-110'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {options.map((option, index) => {
          const isSelected = selectedOptions.includes(option.text);
          const isDisabled = !isSelected && selectedOptions.length >= maxSelections;
          const Icon = getIcon(option.text);

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.1 + index * 0.05,
                type: "spring",
                stiffness: 400,
                damping: 20
              }}
              onClick={() => toggleOption(option.text)}
              disabled={isDisabled}
              className={`border-2 rounded-full px-6 py-3 flex items-center gap-3 group transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-lg ${
                isSelected
                  ? 'bg-gradient-to-r from-[#33E1CE] to-[#8D4CFF] text-white border-transparent'
                  : isDisabled
                  ? 'bg-gray-100 text-gray-400 border-gray-200 opacity-50 cursor-not-allowed'
                  : 'bg-white/50 text-gray-700 border-white/60 hover:border-purple-400'
              }`}
              whileHover={!isDisabled ? { scale: 1.08, y: -2 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
            >
              <Icon 
                className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#8D4CFF]'}`}
                strokeWidth={2}
              />
              {/* Texto opciones: Manrope 16px Medium */}
              <span className="text-[16px] font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {option.text}
              </span>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Botón PRIMARIO continuar: Satoshi 17px SemiBold */}
      <motion.button
        onClick={handleSubmit}
        disabled={selectedOptions.length === 0}
        className={`w-full py-4 px-8 rounded-[28px] transition-all duration-300 text-[17px] font-semibold ${
          selectedOptions.length > 0
            ? 'bg-gradient-to-r from-[#33E1CE] to-[#8D4CFF] text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        style={{ 
          fontFamily: 'Satoshi, sans-serif',
          boxShadow: selectedOptions.length > 0 ? '0 2px 8px rgba(141, 76, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.08)' : 'none'
        }}
        whileHover={selectedOptions.length > 0 ? { scale: 1.02, boxShadow: "0 8px 16px rgba(141, 76, 255, 0.25)" } : {}}
        whileTap={selectedOptions.length > 0 ? { scale: 0.98 } : {}}
      >
        Continuar
        {selectedOptions.length > 0 && ` (${selectedOptions.length} seleccionado${selectedOptions.length > 1 ? 's' : ''})`}
      </motion.button>
    </div>
  );
}