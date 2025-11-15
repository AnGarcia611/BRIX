import { motion } from 'motion/react';
import { Smile, Meh, Frown, X, HelpCircle } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface EmojiOption {
  emoji: string;
  text: string;
}

interface QuestionEmojiProps {
  question: string;
  options: EmojiOption[];
  onAnswer: (value: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

// Mapeo de iconos según la opción
const getIcon = (text: string) => {
  if (text.includes('Tranquilo') || text.includes('sé dónde buscar')) return Smile;
  if (text.includes('enredo')) return Meh;
  if (text.includes('cuesta')) return Frown;
  if (text.includes('pierdo')) return X;
  return HelpCircle;
};

export function QuestionEmoji({ question, options, onAnswer, currentQuestion, totalQuestions }: QuestionEmojiProps) {
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

      <div className="space-y-3">
        {options.map((option, index) => {
          const Icon = getIcon(option.text);
          
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => onAnswer(option.text)}
              className="w-full bg-white/50 backdrop-blur-md hover:bg-white/80 border-2 border-white/60 hover:border-purple-300 rounded-[22px] p-5 flex items-center gap-4 group transition-all duration-300 shadow-sm hover:shadow-lg"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#33E1CE]/20 to-[#8D4CFF]/20 group-hover:from-[#33E1CE]/40 group-hover:to-[#8D4CFF]/40 transition-all"
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
              >
                {/* Iconos 24px */}
                <Icon className="w-6 h-6 text-[#8D4CFF]" strokeWidth={2} />
              </motion.div>
              {/* Texto opciones: Manrope 16px Medium */}
              <span className="text-[16px] font-medium text-gray-700 text-left flex-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {option.text}
              </span>
              <motion.div
                className="text-purple-400 opacity-0 group-hover:opacity-100"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                →
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}