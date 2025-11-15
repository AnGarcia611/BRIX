import { motion } from 'motion/react';
import { Search, RotateCw, Repeat, Navigation, Ban, Wand2, Zap, Palette, Headphones, Sparkles, BookOpen, Layout } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface ChipOption {
  icon: string;
  text: string;
}

interface QuestionChipsProps {
  question: string;
  options: ChipOption[];
  onAnswer: (value: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

// Mapeo de iconos según el tipo de pregunta
const getIcon = (text: string) => {
  // Para pregunta 4 (Mini-escenario)
  if (text.includes('encuentro rápido')) return Search;
  if (text.includes('demoro')) return RotateCw;
  if (text.includes('sin hallarlo')) return Repeat;
  if (text.includes('pierdo entre')) return Navigation;
  if (text.includes('Nunca lo he')) return Ban;
  
  // Para pregunta 8 (Superpoder BRIX)
  if (text.includes('Explicaciones')) return Wand2;
  if (text.includes('Navegación')) return Zap;
  if (text.includes('Visualizaciones')) return Palette;
  if (text.includes('Accesibilidad')) return Headphones;
  if (text.includes('Microcontenidos')) return Sparkles;
  
  // Para pregunta 10 (Completa la frase)
  if (text.includes('clara')) return Sparkles;
  if (text.includes('visual')) return Palette;
  if (text.includes('corta')) return Zap;
  if (text.includes('organizada')) return BookOpen;
  if (text.includes('interactiva')) return Layout;
  
  return Search;
};

export function QuestionChips({ question, options, onAnswer, currentQuestion, totalQuestions }: QuestionChipsProps) {
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

      <div className="flex flex-wrap gap-3 justify-center">
        {options.map((option, index) => {
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
              onClick={() => onAnswer(option.text)}
              className="bg-white/50 backdrop-blur-md hover:bg-gradient-to-r hover:from-[#33E1CE] hover:to-[#8D4CFF] hover:text-white border-2 border-white/60 hover:border-transparent rounded-full px-6 py-3 flex items-center gap-2 group transition-all duration-300 shadow-sm hover:shadow-lg"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
                transition={{ duration: 0.4 }}
              >
                {/* Iconos 24px */}
                <Icon className="w-6 h-6 text-[#8D4CFF] group-hover:text-white" strokeWidth={2} />
              </motion.div>
              {/* Texto opciones: Manrope 16px Medium */}
              <span className="text-[16px] font-medium text-gray-700 group-hover:text-white transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {option.text}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}