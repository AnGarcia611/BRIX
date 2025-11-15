import { motion } from 'motion/react';
import { Info } from 'lucide-react';

export function ScaleExplanation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6 p-5 bg-white/40 backdrop-blur-md rounded-[22px] border border-white/60"
    >
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-[#8D4CFF] mt-0.5 flex-shrink-0" strokeWidth={2} />
        <div>
          <p className="text-[15px] font-medium text-[#1C1C1E] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
            ¿Qué significan las opciones del 1 al 5?
          </p>
          <div className="space-y-1 text-[14px] font-normal text-[#555]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            <p><strong>1</strong> = Muy difícil / Nada útil / Nada dispuesto / Nada cansado</p>
            <p><strong>2</strong> = Difícil / Poco útil / Poco dispuesto / Poco cansado</p>
            <p><strong>3</strong> = Regular / Moderadamente útil / Disposición media / Cansancio medio</p>
            <p><strong>4</strong> = Fácil / Muy útil / Muy dispuesto / Cansancio alto</p>
            <p><strong>5</strong> = Muy fácil / Extremadamente útil / Totalmente dispuesto / Muy cansado</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
