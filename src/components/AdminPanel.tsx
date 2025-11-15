import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, Trash2, LogOut, FileSpreadsheet, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import logoBrix from 'figma:asset/469c37be3526dc1d49e9eb7700555671b6112432.png';

interface AdminPanelProps {
  onLogout: () => void;
}

interface SurveyResponse {
  id: string;
  fecha: string;
  hora: string;
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
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // EmailJS configuration
  const emailConfig = {
    serviceId: 'service_7v9yiqj',
    templateId: 'template_4bdeeal',
    publicKey: 'gzdvhtfWSXknqD1d4',
    destination: 'afgarciaos@gmail.com'
  };

  useEffect(() => {
    loadResponses();
    // Initialize EmailJS with public key
    emailjs.init('gzdvhtfWSXknqD1d4');
  }, []);

  const loadResponses = () => {
    const stored = localStorage.getItem('brix_survey_responses');
    if (stored) {
      setResponses(JSON.parse(stored));
    }
  };



  const clearAllResponses = () => {
    if (confirm('¿Estás seguro de que deseas eliminar TODAS las respuestas? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('brix_survey_responses');
      setResponses([]);
    }
  };

  const sendTestEmail = async () => {
    setIsEmailLoading(true);
    setEmailStatus('idle');

    try {
      // Template parameters que coinciden exactamente con tu test exitoso
      const templateParams = {
        timestamp: new Date().toLocaleString('es-ES'),
        pregunta_01: 'Edad: 25 años',
        pregunta_02: 'Género: Femenino',
        pregunta_03: 'Educación: Universitario',
        pregunta_04: 'Ciudad: Madrid',
        pregunta_05: 'Ocupación: Ingeniero',
        pregunta_06: 'Dispositivos: Smartphone, Laptop',
        pregunta_07: 'Uso internet: Diariamente',
        pregunta_08: 'Red social: Instagram',
        pregunta_09: 'Contenido: Videos',
        pregunta_10: 'Horas dispositivos: 5-7 horas',
        pregunta_11: 'Opinión tecnología: Muy útil',
        respuestas_completas: 'TEST - ' + new Date().toISOString(),
        name: 'Sistema BRIX',
        email: emailConfig.destination
      };

      console.log('Enviando email con parámetros:', templateParams);

      const result = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams
      );

      console.log('Email enviado exitosamente:', result);
      setEmailStatus('success');
      setTimeout(() => setEmailStatus('idle'), 3000);
    } catch (error) {
      console.error('Error detallado enviando email:', error);
      console.error('Configuración usada:', emailConfig);
      setEmailStatus('error');
      setTimeout(() => setEmailStatus('idle'), 5000);
    } finally {
      setIsEmailLoading(false);
    }
  };

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-[28px] shadow-2xl shadow-purple-300/30 p-8 md:p-12 border border-white/50">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-[28px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-[#1C1C1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Panel de Administrador
            </h1>
            <p className="text-[15px] font-normal text-[#555]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Gestiona las respuestas de la encuesta BRIX
            </p>
          </div>
          <motion.button
            onClick={onLogout}
            className="flex items-center gap-2 bg-white/40 backdrop-blur-md text-gray-700 py-3 px-6 rounded-[20px] border border-white/60 hover:bg-white/60 transition-all text-[15px] font-medium"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </motion.button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#33E1CE]/20 to-[#8D4CFF]/20 backdrop-blur-sm rounded-[22px] p-6 border border-white/50"
          >
            <Users className="w-8 h-8 text-[#8D4CFF] mb-3" strokeWidth={2} />
            <p className="text-[15px] font-normal text-[#555]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Total Respuestas
            </p>
            <p className="text-[32px] font-bold text-[#1C1C1E]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {responses.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-100/50 to-blue-100/50 backdrop-blur-sm rounded-[22px] p-6 border border-white/50"
          >
            <Calendar className="w-8 h-8 text-[#8D4CFF] mb-3" strokeWidth={2} />
            <p className="text-[15px] font-normal text-[#555]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Última respuesta
            </p>
            <p className="text-[16px] font-medium text-[#1C1C1E]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {responses.length > 0 ? responses[responses.length - 1].fecha : 'N/A'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-100/50 to-emerald-100/50 backdrop-blur-sm rounded-[22px] p-6 border border-white/50"
          >
            <Calendar className="w-8 h-8 text-green-600 mb-3" strokeWidth={2} />
            <p className="text-[15px] font-normal text-[#555]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Estado
            </p>
            <p className="text-[16px] font-medium text-green-600" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {responses.length > 0 ? 'Datos disponibles' : 'Sin datos'}
            </p>
          </motion.div>
        </div>

        {/* Acciones principales */}
        <div className="space-y-3 mb-6">
          {/* Botón PRIMARIO: Probar EmailJS */}
          <motion.button
            onClick={sendTestEmail}
            disabled={isEmailLoading}
            className={`w-full py-3 px-8 rounded-[28px] border flex items-center justify-center gap-3 text-[15px] font-normal transition-all duration-300 ${emailStatus === 'success'
              ? 'bg-green-100/70 backdrop-blur-sm text-green-700 border-green-200'
              : emailStatus === 'error'
                ? 'bg-red-100/70 backdrop-blur-sm text-red-600 border-red-200'
                : isEmailLoading
                  ? 'bg-blue-100/70 backdrop-blur-sm text-blue-600 border-blue-200'
                  : 'bg-gradient-to-r from-[#33E1CE]/20 to-[#8D4CFF]/20 backdrop-blur-sm text-[#8D4CFF] border-[#8D4CFF]/30 hover:from-[#33E1CE]/30 hover:to-[#8D4CFF]/30'
              }`}
            style={{ fontFamily: 'Manrope, sans-serif' }}
            whileHover={!isEmailLoading ? { scale: 1.01 } : {}}
            whileTap={!isEmailLoading ? { scale: 0.99 } : {}}
          >
            {isEmailLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Enviando correo de prueba...
              </>
            ) : emailStatus === 'success' ? (
              'Correo enviado exitosamente ✓'
            ) : emailStatus === 'error' ? (
              'Error al enviar correo ✗'
            ) : (
              <>
                <Send className="w-5 h-5" />
                Probar integración EmailJS
              </>
            )}
          </motion.button>

          {/* Botón SECUNDARIO: Eliminar respuestas */}
          <motion.button
            onClick={clearAllResponses}
            disabled={responses.length === 0}
            className={`w-full py-3 px-8 rounded-[28px] border flex items-center justify-center gap-3 text-[15px] font-normal transition-all duration-300 ${responses.length > 0
              ? 'bg-gray-100/70 backdrop-blur-sm text-red-600 border-red-200 hover:bg-red-50/50'
              : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              }`}
            style={{ fontFamily: 'Manrope, sans-serif' }}
            whileHover={responses.length > 0 ? { scale: 1.01 } : {}}
            whileTap={responses.length > 0 ? { scale: 0.99 } : {}}
          >
            <Trash2 className="w-5 h-5" />
            Eliminar todas las respuestas
          </motion.button>
        </div>

        {/* Vista previa de respuestas */}
        {responses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 bg-white/30 backdrop-blur-md rounded-[22px] border border-white/50"
          >
            <h3 className="text-[20px] font-medium text-[#1C1C1E] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Últimas 5 respuestas
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {responses.slice(-5).reverse().map((response, index) => (
                <div key={index} className="bg-white/50 backdrop-blur-sm rounded-[16px] p-4 border border-white/60">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[14px] font-medium text-[#1C1C1E]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        ID: {response.id}
                      </p>
                      <p className="text-[13px] text-[#555]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {response.fecha} a las {response.hora}
                      </p>
                    </div>
                    <div className="text-[12px] text-gray-500" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      11 respuestas
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mensaje si no hay respuestas */}
        {responses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-8 bg-white/30 backdrop-blur-md rounded-[22px] border border-white/50 text-center"
          >
            <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-[16px] font-medium text-gray-600" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Aún no hay respuestas registradas
            </p>
            <p className="text-[14px] text-gray-500 mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Las respuestas aparecerán aquí cuando los usuarios completen la encuesta
            </p>
          </motion.div>
        )}

        {/* Logo BRIX en el footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 pt-6 border-t border-white/30 flex justify-center"
        >
          <img src={logoBrix} alt="BRIX" className="h-10 opacity-70" />
        </motion.div>
      </motion.div>
    </div>
  );
}