import { motion } from 'motion/react';
import { HelpCircle, Book, FileText, Search, Lightbulb } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface CardOption {
  icon: string;
  text: string;
}

interface QuestionCardsProps {
  question: string;
  options: CardOption[];
  onAnswer: (value: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

// Mapeo de iconos
const getIcon = (text: string) => {
  if (text.includes('confuso')) return HelpCircle;
  if (text.includes('técnico')) return Book;
  if (text.includes('veces')) return FileText;
  if (text.includes('Generalmente')) return Search;
  if (text.includes('Fácil')) return Lightbulb;
  return FileText;
};

export function QuestionCards({ question, options, onAnswer, currentQuestion, totalQuestions }: QuestionCardsProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => {
          const Icon = getIcon(option.text);
          
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05, type: "spring", stiffness: 300 }}
              onClick={() => onAnswer(option.text)}
              className="bg-white/50 backdrop-blur-md hover:bg-white/80 border-2 border-white/60 hover:border-purple-300 rounded-[22px] p-6 flex flex-col items-center gap-3 group transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#33E1CE]/10 to-[#8D4CFF]/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#33E1CE]/20 to-[#8D4CFF]/20 flex items-center justify-center relative z-10 group-hover:from-[#33E1CE]/40 group-hover:to-[#8D4CFF]/40 transition-all"
                whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                {/* Iconos 24px */}
                <Icon className="w-8 h-8 text-[#8D4CFF]" strokeWidth={2} />
              </motion.div>
              {/* Texto opciones: Manrope 16px Medium */}
              <span className="text-[16px] font-medium text-gray-700 text-center relative z-10" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {option.text}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}