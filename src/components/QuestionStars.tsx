import { motion } from 'motion/react';
import { ProgressBar } from './ProgressBar';
import { Star } from 'lucide-react';

interface StarOption {
  stars: number;
  text: string;
}

interface QuestionStarsProps {
  question: string;
  options: StarOption[];
  onAnswer: (value: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export function QuestionStars({ question, options, onAnswer, currentQuestion, totalQuestions }: QuestionStarsProps) {
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

      <div className="space-y-4">
        {options.map((option, index) => (
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
            {/* Estrellas 24px */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, starIndex) => (
                <motion.div
                  key={starIndex}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.2 + index * 0.05 + starIndex * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -15, 15, 0],
                  }}
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      starIndex < option.stars
                        ? 'fill-[#33E1CE] text-[#33E1CE]'
                        : 'fill-gray-200 text-gray-300'
                    }`}
                    strokeWidth={2}
                  />
                </motion.div>
              ))}
            </div>

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
        ))}
      </div>
    </div>
  );
}