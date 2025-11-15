import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftCircle } from 'lucide-react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionEmoji } from './components/QuestionEmoji';
import { QuestionSlider } from './components/QuestionSlider';
import { QuestionStepper } from './components/QuestionStepper';
import { QuestionCards } from './components/QuestionCards';
import { QuestionChips } from './components/QuestionChips';
import { QuestionMultiChips } from './components/QuestionMultiChips';
import { QuestionStars } from './components/QuestionStars';
import { FinalScreen } from './components/FinalScreen';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [responses, setResponses] = useState({
    response_01: '',
    response_02: '',
    response_03: '',
    response_04: '',
    response_05: '',
    response_06: [] as string[],
    response_07: '',
    response_08: '',
    response_09: '',
    response_10: '',
    response_11: '',
  });

  const handleResponse = (key: string, value: string | string[]) => {
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const nextScreen = () => {
    setCurrentScreen(prev => prev + 1);
  };

  const handleAdminAccess = () => {
    setIsAdminMode(true);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminMode(false);
    setCurrentScreen(0);
  };

  const handleBackFromLogin = () => {
    setIsAdminMode(false);
  };

  const handleBackToHome = () => {
    // Volver al inicio SIN borrar las respuestas guardadas
    setCurrentScreen(0);
  };

  // Pantallas de administrador
  if (isAdminMode) {
    if (!isAdminLoggedIn) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#F4EEFF] via-purple-50 to-blue-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <AdminLogin 
              onLoginSuccess={handleAdminLoginSuccess}
              onBack={handleBackFromLogin}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#F4EEFF] via-purple-50 to-blue-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <AdminPanel onLogout={handleAdminLogout} />
          </div>
        </div>
      );
    }
  }

  const screens = [
    // Pantalla 0: Bienvenida
    <WelcomeScreen 
      onStart={nextScreen} 
      onAdminAccess={handleAdminAccess}
    />,
    
    // Pantalla 1: Pregunta 1 - Emoción
    <QuestionEmoji
      question="Cuando te toca consultar el Título B de la NSR-10, ¿qué sientes realmente?"
      options={[
        { emoji: '', text: 'Tranquilo/a, sé dónde buscar' },
        { emoji: '', text: 'Me enredo un poquito' },
        { emoji: '', text: 'Me cuesta bastante' },
        { emoji: '', text: 'Me pierdo rápido' },
        { emoji: '', text: 'No lo he usado mucho' },
      ]}
      onAnswer={(value) => {
        handleResponse('response_01', value);
        nextScreen();
      }}
      currentQuestion={1}
      totalQuestions={11}
    />,

    // Pantalla 2: Escala Likert
    <QuestionSlider
      question="¿Cómo calificarías tu nivel de comprensión de los requisitos del Título B de la NSR-10?"
      labels={['Muy difícil', 'Difícil', 'Regular', 'Fácil', 'Muy fácil']}
      onAnswer={(value) => {
        handleResponse('response_02', value);
        nextScreen();
      }}
      currentQuestion={2}
      totalQuestions={11}
    />,

    // Pantalla 3: Pregunta 3 - Claridad del lenguaje
    <QuestionCards
      question="¿Qué tan claro te parece el lenguaje del Título B de la NSR-10?"
      options={[
        { icon: '', text: 'Muy confuso' },
        { icon: '', text: 'Demasiado técnico' },
        { icon: '', text: 'Claro a veces sí, a veces no' },
        { icon: '', text: 'Generalmente claro' },
        { icon: '', text: 'Fácil de entender' },
      ]}
      onAnswer={(value) => {
        handleResponse('response_03', value);
        nextScreen();
      }}
      currentQuestion={3}
      totalQuestions={11}
    />,

    // Pantalla 4: Pregunta 4 - Mini-escenario
    <QuestionChips
      question="Cuando necesitas encontrar un artículo dentro del Título B de la NSR-10, ¿qué suele pasar?"
      options={[
        { icon: '', text: 'Lo encuentro rápido' },
        { icon: '', text: 'Me demoro un poco' },
        { icon: '', text: 'Entro y salgo sin hallarlo' },
        { icon: '', text: 'Me pierdo entre secciones' },
        { icon: '', text: 'Nunca lo he buscado' },
      ]}
      onAnswer={(value) => {
        handleResponse('response_04', value);
        nextScreen();
      }}
      currentQuestion={4}
      totalQuestions={11}
    />,

    // Pantalla 5: Pregunta 5 - Esfuerzo visual (escala 1-5)
    <QuestionSlider
      question="¿Cuánto te cansa leer el PDF actual de la NSR-10?"
      labels={['Nada cansado', 'Poco cansado', 'Cansancio medio', 'Cansancio alto', 'Muy cansado']}
      onAnswer={(value) => {
        handleResponse('response_05', value);
        nextScreen();
      }}
      currentQuestion={5}
      totalQuestions={11}
    />,

    // Pantalla 6: Pregunta 6 - Formatos preferidos
    <QuestionMultiChips
      question="¿Qué formato te ayuda más a entender un tema técnico?"
      subtitle="(Selecciona máximo dos)"
      options={[
        { icon: '', text: 'Videos cortos' },
        { icon: '', text: 'Infografías' },
        { icon: '', text: 'Interacciones o animaciones' },
        { icon: '', text: 'Texto resumido' },
        { icon: '', text: 'Diagramas o ejemplos visuales' },
      ]}
      maxSelections={2}
      onAnswer={(value) => {
        handleResponse('response_06', value);
        nextScreen();
      }}
      currentQuestion={6}
      totalQuestions={11}
    />,

    // Pantalla 7: Pregunta 7 - Utilidad de navegación (stepper horizontal minimalista)
    <QuestionStepper
      question="¿Qué tan útil sería que la NSR-10 tuviera buscador y navegación rápida?"
      labels={['Nada útil', 'Poco útil', 'Moderadamente útil', 'Muy útil', 'Extremadamente útil']}
      onAnswer={(value) => {
        handleResponse('response_07', value);
        nextScreen();
      }}
      currentQuestion={7}
      totalQuestions={11}
    />,

    // Pantalla 8: Pregunta 8 - Superpoder BRIX
    <QuestionChips
      question="Si BRIX pudiera tener un superpoder, ¿cuál elegirías?"
      options={[
        { icon: '', text: 'Explicaciones claras' },
        { icon: '', text: 'Navegación rápida' },
        { icon: '', text: 'Visualizaciones y gráficos' },
        { icon: '', text: 'Accesibilidad mejorada' },
        { icon: '', text: 'Microcontenidos cortos' },
      ]}
      onAnswer={(value) => {
        handleResponse('response_08', value);
        nextScreen();
      }}
      currentQuestion={8}
      totalQuestions={11}
    />,

    // Pantalla 9: Pregunta 9 - Disposición de uso (escala 1-5)
    <QuestionSlider
      question="¿Qué tantas ganas tendrías de usar BRIX para estudiar el Título B de la NSR-10?"
      labels={['Nada dispuesto', 'Poco dispuesto', 'Disposición media', 'Muy dispuesto', 'Totalmente dispuesto']}
      onAnswer={(value) => {
        handleResponse('response_09', value);
        nextScreen();
      }}
      currentQuestion={9}
      totalQuestions={11}
    />,

    // Pantalla 10: Pregunta 10 - Completa la frase
    <QuestionChips
      question="Estudiaría más la NSR-10 si…"
      options={[
        { icon: '', text: 'Fuera más clara' },
        { icon: '', text: 'Fuera más visual' },
        { icon: '', text: 'Fuera más corta' },
        { icon: '', text: 'Estuviera mejor organizada' },
        { icon: '', text: 'Fuera interactiva' },
      ]}
      onAnswer={(value) => {
        handleResponse('response_10', value);
        nextScreen();
      }}
      currentQuestion={10}
      totalQuestions={11}
    />,

    // Pantalla 11: Pregunta 11 - Experiencia actual
    <QuestionStars
      question="¿Cómo describirías tu experiencia actual con el Título B de la NSR-10?"
      options={[
        { stars: 5, text: 'Muy buena' },
        { stars: 4, text: 'Buena' },
        { stars: 3, text: 'Neutral' },
        { stars: 2, text: 'Mala' },
        { stars: 1, text: 'Muy mala' },
      ]}
      onAnswer={(value) => {
        handleResponse('response_11', value);
        nextScreen();
      }}
      currentQuestion={11}
      totalQuestions={11}
    />,

    // Pantalla 12: Final
    <FinalScreen responses={responses} />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4EEFF] via-purple-50 to-blue-50 flex items-center justify-center p-4">
      {/* Botón universal solo ícono - Superior izquierda - Visible en TODAS las pantallas */}
      {currentScreen > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          onClick={handleBackToHome}
          className="fixed top-6 left-6 z-50 transition-all"
          style={{
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.08))',
          }}
          whileHover={{ scale: 1.1, opacity: 0.8 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Volver al inicio"
        >
          <ChevronLeftCircle 
            className="w-7 h-7 text-[#333333]" 
            strokeWidth={1.5}
            fill="rgba(51, 51, 51, 0.12)"
          />
        </motion.button>
      )}

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}