import { motion } from 'motion/react';
import { CheckCircle2, Home } from 'lucide-react';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import isologo from 'figma:asset/ba49dfa6856e5c46796ea1e65e26fd53f21677b4.png';

interface FinalScreenProps {
  responses: {
    response_01: string;
    response_02: string;
    response_03: string;
    response_04: string;
    response_05: string;
    response_06: string | string[];
    response_07: string;
    response_08: string;
    response_09: string;
    response_10: string;
    response_11: string;
  };
}

export function FinalScreen({ responses }: FinalScreenProps) {
  // Configuración EmailJS
  const emailConfig = {
    serviceId: 'service_7v9yiqj',
    templateId: 'template_4bdeeal',
    publicKey: 'gzdvhtfWSXknqD1d4'
  };

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init(emailConfig.publicKey);
  }, []);

  // Función para enviar email automático
  const sendSurveyEmail = async (surveyData: any) => {
    try {
      const templateParams = {
        timestamp: `${surveyData.fecha} a las ${surveyData.hora}`,
        pregunta_01: `Cuando te toca consultar el Título B de la NSR-10, ¿qué sientes realmente? - ${responses.response_01}`,
        pregunta_02: `¿Cómo calificarías tu nivel de comprensión de los requisitos del Título B de la NSR-10? - ${responses.response_02}`,
        pregunta_03: `¿Qué tan claro te parece el lenguaje del Título B de la NSR-10? - ${responses.response_03}`,
        pregunta_04: `Cuando necesitas encontrar un artículo dentro del Título B de la NSR-10, ¿qué suele pasar? - ${responses.response_04}`,
        pregunta_05: `¿Cuánto te cansa leer el PDF actual de la NSR-10? - ${responses.response_05}`,
        pregunta_06: `¿Qué formato te ayuda más a entender un tema técnico? - ${Array.isArray(responses.response_06) ? responses.response_06.join(', ') : responses.response_06}`,
        pregunta_07: `¿Qué tan útil sería que la NSR-10 tuviera buscador y navegación rápida? - ${responses.response_07}`,
        pregunta_08: `Si BRIX pudiera tener un superpoder, ¿cuál elegirías? - ${responses.response_08}`,
        pregunta_09: `¿Qué tantas ganas tendrías de usar BRIX para estudiar el Título B de la NSR-10? - ${responses.response_09}`,
        pregunta_10: `¿Cómo describirías tu experiencia actual con el Título B de la NSR-10? - ${responses.response_10}`,
        pregunta_11: `Comentarios adicionales o sugerencias: ${responses.response_11 || 'Sin comentarios adicionales'}`,
        respuestas_completas: JSON.stringify(surveyData, null, 2),
        email: 'dandreasanchez@unicolmayor.edu.co',
        name: `Usuario BRIX - ${surveyData.id}`
      };

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams
      );
      
      console.log('Email de encuesta enviado exitosamente');
    } catch (error) {
      console.error('Error enviando email de encuesta:', error);
    }
  };

  // Guardar respuestas en localStorage
  const saveResponses = async () => {
    const now = new Date();
    const sessionId = `BRIX-${now.getTime()}`;
    
    const surveyData = {
      id: sessionId,
      fecha: now.toLocaleDateString('es-ES'),
      hora: now.toLocaleTimeString('es-ES'),
      response_01: responses.response_01,
      response_02: responses.response_02,
      response_03: responses.response_03,
      response_04: responses.response_04,
      response_05: responses.response_05,
      response_06: responses.response_06,
      response_07: responses.response_07,
      response_08: responses.response_08,
      response_09: responses.response_09,
      response_10: responses.response_10,
      response_11: responses.response_11,
    };

    // Obtener respuestas existentes
    const existing = localStorage.getItem('brix_survey_responses');
    const allResponses = existing ? JSON.parse(existing) : [];
    
    // Agregar nueva respuesta
    allResponses.push(surveyData);
    
    // Guardar en localStorage
    localStorage.setItem('brix_survey_responses', JSON.stringify(allResponses));
    
    // Enviar email automáticamente
    await sendSurveyEmail(surveyData);
  };

  // Guardar al montar el componente
  useEffect(() => {
    saveResponses();
  }, []);

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-[28px] shadow-2xl shadow-purple-300/30 p-8 md:p-12 border border-white/50">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-[28px] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="text-center mb-8"
      >
        {/* Animación de check iOS style */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#33E1CE] to-[#8D4CFF] rounded-full mb-6 shadow-lg shadow-purple-300/50 backdrop-blur-sm"
        >
          <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
        </motion.div>

        {/* Título principal: Satoshi 28px Bold #1C1C1E */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[28px] font-bold text-[#1C1C1E] mb-4"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          ¡Gracias!
        </motion.h1>

        {/* Descripción: Manrope 15px Regular #555 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[15px] font-normal text-[#555] leading-relaxed"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          Tus respuestas nos ayudan a construir BRIX.
        </motion.p>
      </motion.div>

      {/* Badge de respuestas guardadas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-green-100/50 backdrop-blur-md px-5 py-3 rounded-full border border-green-200/50 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[15px] font-medium text-green-700" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Tus respuestas se guardaron correctamente
          </span>
        </div>
      </motion.div>

      {/* Botón PRIMARIO volver al inicio */}
      <div className="space-y-3 mb-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          onClick={handleRestart}
          className="w-full bg-gradient-to-r from-[#33E1CE] to-[#8D4CFF] text-white py-4 px-8 rounded-[28px] relative overflow-hidden group backdrop-blur-sm flex items-center justify-center gap-3 text-[17px] font-semibold"
          style={{ 
            fontFamily: 'Satoshi, sans-serif',
            boxShadow: '0 2px 8px rgba(141, 76, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.08)'
          }}
          whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(141, 76, 255, 0.25)" }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-xl"
            transition={{ duration: 0.3 }}
          />
          
          <Home className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Volver al inicio</span>
        </motion.button>
      </div>

      {/* Información adicional con glassmorphism */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="p-6 bg-white/30 backdrop-blur-md rounded-[22px] border border-white/50 shadow-sm"
      >
        <p className="text-[15px] font-normal text-[#555] text-center leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
          ✨ Tu participación es muy valiosa para nosotros
          <br />
          <span className="text-xs text-gray-500">
            Gracias por ayudarnos a mejorar la experiencia con la NSR-10
          </span>
        </p>
      </motion.div>

      {/* Logo BRIX */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-8 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-2">
          <img src={isologo} alt="BRIX Logo" className="w-8 h-8" />
          <span className="text-[24px] font-bold bg-gradient-to-r from-[#33E1CE] to-[#8D4CFF] bg-clip-text text-transparent" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            BRIX
          </span>
        </div>
        <span className="text-xs text-gray-500" style={{ fontFamily: 'Manrope, sans-serif' }}>Ecosistema visual BRIX</span>
      </motion.div>
    </div>
  );
}