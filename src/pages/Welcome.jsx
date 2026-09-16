import { Link } from 'react-router-dom';
import { Button } from '../components/UI';
import {
  FiShield,
  FiSliders,
  FiCheckCircle,
  FiActivity,
  FiFileText,
  FiLock,
  FiCpu,
} from 'react-icons/fi';

// ============================================================================
// PÁGINA: Welcome.jsx — INDUCCIÓN Y PRESENTACIÓN INSTITUCIONAL (INF-133 UMSA)
// ============================================================================
// --- 1. Estilos y Encabezado: 'text-2xl sm:text-4xl' en título principal
// --- 2. Grilla de Fases Metodológicas: 'grid-cols-1 md:grid-cols-3'
// --- 3. Acciones Rápidas: Enlaces directos a diagnóstico y parámetros
// ============================================================================

export default function Welcome() {
  // --- Fases metodológicas de la auditoría de seguridad ---
  const methodologyPhases = [
    {
      step: '01',
      title: 'Auditoría Sistemática',
      domain: '10 Controles Defensivos',
      desc: 'Evaluación exhaustiva en 5 dominios: Accesos, Respaldos, Dispositivos, Concientización e Incidentes.',
      icon: <FiFileText size={20} className="text-emerald-500" />,
    },
    {
      step: '02',
      title: 'Matriz Cuantitativa 3×3',
      domain: 'Modelado de Amenazas',
      desc: 'Cálculo de probabilidad vs impacto para identificar cuadrantes de riesgo crítico, alto y medio.',
      icon: <FiActivity size={20} className="text-amber-500" />,
    },
    {
      step: '03',
      title: 'Plan de Remediación',
      domain: 'Priorización con ROI',
      desc: 'Definición de contramedidas operativas, pasos de despliegue y retorno de inversión en seguridad.',
      icon: <FiCheckCircle size={20} className="text-emerald-500" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* --- 1. SECCIÓN HERO DE PRESENTACIÓN --- */}
      {/* Contenedor principal de bienvenida */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 shadow-xs">
        
        {/* Membrete institucional */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium mb-6">
          <FiShield className="text-emerald-600 dark:text-emerald-400" size={14} />
          <span>UMSA · INF-133 PROGRAMACIÓN WEB III · GESTIÓN II-2026</span>
        </div>

        {/* Título y propuesta técnica */}
        <div className="max-w-2xl space-y-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Sistema de Auditoría y Postura de Seguridad Defensiva
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Plataforma institucional para el diagnóstico técnico de controles, cuantificación
            de exposición a amenazas y estructuración de planes de tratamiento de riesgos para
            laboratorios y unidades académicas.
          </p>
        </div>

        {/* --- Acciones Rápidas --- */}
        <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <Button to="/diagnostico" icon="arrow" variant="primary">
            Iniciar Auditoría Técnica
          </Button>
          <Button to="/" variant="secondary">
            Acceder al Tablero de Control
          </Button>
          <Link
            to="/personalizar"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors"
          >
            <FiSliders size={14} />
            <span>Parámetros y Simulación</span>
          </Link>
        </div>
      </div>

      {/* --- 2. FASES METODOLÓGICAS DEL SISTEMA --- */}
      {/* Cuadrícula de fases: grid-cols-1 md:grid-cols-3 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
            Metodología de Auditoría Implementada
          </h2>
          <span className="text-xs text-zinc-400 font-mono">3 Etapas Consecutivas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {methodologyPhases.map((phase) => (
            <div
              key={phase.step}
              className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                    {phase.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-500">
                    FASE {phase.step}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {phase.title}
                </h3>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold block mb-2">
                  {phase.domain}
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {phase.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
                <FiLock size={12} /> Cumplimiento Académico
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MEMBRETE INFERIOR Y ALCANCE DE LABORATORIO */}
      <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <FiCpu className="text-zinc-400" size={14} />
          <span>Módulo Frontend · Universidad Mayor de San Andrés</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Docente: Lic. Jhonny Roberto Felipez Andrade</span>
          <span>Paralelo INF-133</span>
        </div>
      </div>
    </div>
  );
}
