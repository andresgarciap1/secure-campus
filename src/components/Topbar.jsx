import { useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiPrinter } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAssessment } from '../context/AssessmentContext';

// ============================================================================
// COMPONENTE: Topbar.jsx (Encabezado Superior y Control de Sesión)
// ============================================================================
// --- Dimensiones: Altura estándar h-16, borde inferior border-zinc-200/800 ---
// --- Elementos: Breadcrumb jerárquico, estado de sesión, exportación PDF y tema ---
// ============================================================================

const viewTitles = {
  '/': 'Tablero de Control',
  '/diagnostico': 'Auditoría de Controles',
  '/riesgos': 'Matriz de Exposición',
  '/recomendaciones': 'Plan de Remediación',
  '/guia': 'Guía Defensiva',
  '/personalizar': 'Parámetros y Simulación',
  '/acerca': 'Ficha Técnica del Sistema',
  '/inicio': 'Inducción Institucional',
};

const Topbar = () => {
  const { pathname } = useLocation();
  const { theme, updateTheme } = useTheme();
  const { record } = useAssessment();
  const currentTitle = viewTitles[pathname] || 'SecureCampus · INF-133';

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-white dark:bg-zinc-900 h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 shrink-0 transition-colors">
      
      {/* --- 1. Lado Izquierdo: Breadcrumb Jerárquico --- */}
      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 min-w-0">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide shrink-0">
          UMSA · INF-133
        </span>
        <span className="text-zinc-400 dark:text-zinc-600">/</span>
        <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
          {currentTitle}
        </h1>
      </div>

      {/* --- 2. Lado Derecho: Estado, Reportes y Perfil --- */}
      <div className="flex items-center gap-3">
        
        {/* Badge de Entorno */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-[11px] font-mono text-zinc-600 dark:text-zinc-300">
          <span
            className={`w-2 h-2 rounded-full ${
              record.mode === 'demo' ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
          />
          <span>{record.mode === 'demo' ? 'Modo Demostración' : 'Auditoría Activa'}</span>
        </div>

        {/* Botón de Impresión / Exportación de Reporte PDF */}
        <button
          onClick={handlePrint}
          title="Exportar Reporte Técnico (Ctrl + P)"
          className="h-8 px-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer"
        >
          <FiPrinter size={14} />
          <span className="hidden md:inline">Reporte PDF</span>
        </button>

        {/* Selector de Modo Oscuro / Claro */}
        <button
          onClick={() => updateTheme({ dark: !theme.dark })}
          aria-label={theme.dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="h-8 w-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
        >
          {theme.dark ? <FiSun size={15} /> : <FiMoon size={15} />}
        </button>

        {/* Perfil de Auditor */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-zinc-200 dark:border-zinc-800">
          <div className="bg-secondary text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-xs">
            AC
          </div>
          <div className="hidden lg:flex flex-col text-left leading-tight">
            <span className="text-zinc-900 dark:text-zinc-100 font-medium text-xs">
              Auditor Principal
            </span>
            <span className="text-zinc-400 text-[10px] font-mono">
              CSIRT · Ciberseguridad
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
