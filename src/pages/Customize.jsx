import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { useTheme } from '../context/ThemeContext';
import { defenseScenarios } from '../data/security';
import { FiSliders, FiCheckCircle, FiAlertTriangle, FiShield, FiDownload, FiPrinter, FiSun, FiMoon } from 'react-icons/fi';

// ============================================================================
// CONFIGURACIÓN: PARÁMETROS Y SIMULACIÓN DE AUDITORÍA
// ============================================================================
// --- 1. Perfiles de Postura y Líneas Base ---
// --- 2. Parámetros de la Unidad Evaluada ---
// --- 3. Generación y Exportación de Reportes ---
// ============================================================================

export default function Customize() {
  const { record, result, loadScenario, setUnit } = useAssessment();
  const { theme, updateTheme } = useTheme();
  const [activeNotification, setActiveNotification] = useState('');
  const navigate = useNavigate();

  // --- Cargar perfil de referencia y actualizar estado ---
  const handleApplyScenario = (scenarioKey) => {
    const scenario = defenseScenarios[scenarioKey];
    if (!scenario) return;
    loadScenario(scenario.answers, scenario.unit);
    setActiveNotification(`Perfil aplicado: ${scenario.name}`);
    setTimeout(() => setActiveNotification(''), 4000);
  };

  // --- Exportar estado de auditoría en formato JSON ---
  const handleExportJSON = () => {
    const reportData = {
      institucion: 'Universidad Mayor de San Andrés',
      facultad: 'Facultad de Ciencias Puras y Naturales',
      carrera: 'Licenciatura en Informática',
      materia: 'INF-133 Programación Web III',
      gestion: 'II-2026',
      unidadEvaluada: record.unit,
      fechaAuditoria: record.date || new Date().toISOString(),
      indiceMadurez: `${result.score}%`,
      hallazgosCriticos: result.highRisks,
      controlesImplementados: `${result.implemented}/10`,
      detallesPorCategoria: result.categories,
      respuestasRegistradas: record.answers,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auditoria-seguridad-${record.unit.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* --- Encabezado de la Vista --- */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">
          Parámetros y Simulación · CSIRT Institucional
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
          Parámetros y Simulación de Auditoría
        </h1>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          Carga perfiles de referencia para evaluar la respuesta de la postura de seguridad y exporta reportes técnicos.
        </p>
      </div>

      {/* --- Notificación de Estado --- */}
      {activeNotification && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FiCheckCircle size={15} />
            {activeNotification}
          </span>
          <button
            onClick={() => navigate('/')}
            className="underline font-bold hover:text-emerald-300 cursor-pointer"
          >
            Ver en Tablero →
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* --- Panel 1: Perfiles de Postura de Seguridad --- */}
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
              <FiSliders size={16} className="text-emerald-500" />
              <span>Perfiles de Postura de Seguridad</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Prueba la reactividad de los indicadores ante diferentes niveles de madurez.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Perfil Crítico */}
            <div className="p-3.5 rounded-lg border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-colors flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <FiAlertTriangle size={14} />
                  Perfil Crítico (20% Madurez)
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Simula múltiples fallas graves de MFA y desactualización.
                </p>
              </div>
              <button
                onClick={() => handleApplyScenario('critical')}
                className="h-8 px-3 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                Cargar
              </button>
            </div>

            {/* Perfil Intermedio */}
            <div className="p-3.5 rounded-lg border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-colors flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <FiSliders size={14} />
                  Perfil Línea Base (65% Madurez)
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Escenario estándar con controles en proceso de implementación.
                </p>
              </div>
              <button
                onClick={() => handleApplyScenario('intermediate')}
                className="h-8 px-3 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                Cargar
              </button>
            </div>

            {/* Perfil Conforme */}
            <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <FiShield size={14} />
                  Perfil Conforme (100% Madurez)
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Todos los 10 controles defensivos implementados y auditados.
                </p>
              </div>
              <button
                onClick={() => handleApplyScenario('compliant')}
                className="h-8 px-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                Cargar
              </button>
            </div>
          </div>
        </section>

        {/* --- Panel 2: Dependencia y Exportación de Reportes --- */}
        <div className="space-y-6">
          
          {/* Dependencia Evaluada */}
          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-3">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Dependencia / Unidad Evaluada
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Personaliza el nombre de la unidad para los reportes oficiales.
            </p>

            <div className="pt-1 flex gap-2">
              <input
                type="text"
                value={record.unit}
                onChange={(e) => setUnit(e.target.value)}
                maxLength={80}
                placeholder="Ej. Laboratorio de Redes - UMSA"
                className="flex-1 h-9 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            
            {/* Presets rápidos universitarios */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Laboratorio de Informática',
                'Servidores Web FCPN',
                'Kardex Académico',
                'Biblioteca Central UMSA',
              ].map((name) => (
                <button
                  key={name}
                  onClick={() => setUnit(name)}
                  className="text-[11px] px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-mono transition-colors cursor-pointer"
                >
                  {name}
                </button>
              ))}
            </div>
          </section>

          {/* Exportación y Reportes */}
          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Reportes Técnicos de Postura
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleExportJSON}
                className="h-10 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FiDownload size={15} />
                <span>Exportar JSON</span>
              </button>

              <button
                onClick={() => window.print()}
                className="h-10 px-3 rounded-lg bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FiPrinter size={15} />
                <span>Exportar PDF</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
              <span>Tema de Interfaz</span>
              <button
                onClick={() => updateTheme({ dark: !theme.dark })}
                className="h-8 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium cursor-pointer"
              >
                {theme.dark ? <FiSun size={14} /> : <FiMoon size={14} />}
                <span>{theme.dark ? 'Modo Oscuro' : 'Modo Claro'}</span>
              </button>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
