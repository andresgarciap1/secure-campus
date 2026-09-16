import { NavLink, Link } from 'react-router-dom';
import { MdDashboardCustomize } from 'react-icons/md';
import { FaClipboardCheck, FaChartBar, FaShieldAlt } from 'react-icons/fa';
import { FaFileSignature } from 'react-icons/fa6';
import { FiInfo, FiSliders, FiBookOpen } from 'react-icons/fi';
import { useAssessment } from '../context/AssessmentContext';

// ============================================================================
// COMPONENTE: Sidebar.jsx (Navegación Institucional)
// ============================================================================
// --- Ancho estándar: w-64, fondo institucional bg-primary ---
// --- Indicador activo: bg-secondary text-white ---
// ============================================================================

const Sidebar = () => {
  const { record } = useAssessment();

  // --- Estilos de enlace de navegación ---
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'bg-secondary text-white h-9 rounded-lg flex items-center px-4 gap-3 text-sm font-medium shadow-xs transition-colors'
      : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100 h-9 rounded-lg flex items-center px-4 gap-3 text-sm transition-colors';

  return (
    <aside className="bg-primary w-64 h-screen flex flex-col shrink-0 select-none border-r border-white/10">
      
      {/* --- 1. Cabecera Institucional UMSA con Enlace a Inducción --- */}
      <Link
        to="/inicio"
        title="Ir a Inducción Institucional"
        className="h-16 border-b border-white/10 flex items-center px-5 gap-3 hover:bg-white/5 transition-colors cursor-pointer"
      >
        <div className="bg-secondary w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-xs">
          <FaShieldAlt size={19} />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm tracking-wide">
            Secure<span className="text-emerald-400 font-normal">Campus</span>
          </span>
          <span className="text-zinc-400 text-[10px] tracking-wider uppercase font-semibold">
            UMSA · INF-133 Web III
          </span>
        </div>
      </Link>

      {/* --- 2. Perfil de Auditor y Unidad Evaluada --- */}
      <div className="h-16 flex items-center px-5 border-b border-white/10 bg-white/[0.02]">
        <div className="bg-secondary/40 text-emerald-300 border border-emerald-500/30 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">
          AC
        </div>
        <div className="flex flex-col px-3 min-w-0">
          <span className="text-white font-semibold text-xs truncate" title={record.unit}>
            {record.unit || 'Laboratorio de Informática'}
          </span>
          <span className="text-zinc-400 text-[10px] flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                record.mode === 'demo' ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
            />
            {record.mode === 'demo' ? 'Modo Demostración' : 'Auditoría Activa'}
          </span>
        </div>
      </div>

      {/* --- 3. Módulos Principales de Navegación --- */}
      <nav className="flex-1 overflow-y-auto flex flex-col gap-1 px-3 pt-3">
        {/* SECCIÓN 1: AUDITORÍA Y POSTURA */}
        <h2 className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest px-4 pb-1">
          Auditoría de Seguridad
        </h2>

        <NavLink to="/" end className={navLinkClass}>
          <MdDashboardCustomize size={18} />
          <span>Tablero de Control</span>
        </NavLink>

        <NavLink to="/diagnostico" className={navLinkClass}>
          <FaClipboardCheck size={17} />
          <span className="flex-1">Auditoría de Controles</span>
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
            10
          </span>
        </NavLink>

        <NavLink to="/riesgos" className={navLinkClass}>
          <FaChartBar size={17} />
          <span>Matriz de Exposición</span>
        </NavLink>

        <NavLink to="/recomendaciones" className={navLinkClass}>
          <FaFileSignature size={17} />
          <span>Plan de Remediación</span>
        </NavLink>

        <NavLink to="/guia" className={navLinkClass}>
          <FiBookOpen size={17} />
          <span>Guía Defensiva</span>
        </NavLink>

        {/* SECCIÓN 2: SISTEMA Y RECURSOS */}
        <h2 className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest px-4 pt-4 pb-1">
          Sistema y Parámetros
        </h2>

        <NavLink to="/personalizar" className={navLinkClass}>
          <FiSliders size={17} />
          <span>Parámetros y Simulación</span>
        </NavLink>

        <NavLink to="/acerca" className={navLinkClass}>
          <FiInfo size={17} />
          <span>Ficha Técnica del Sistema</span>
        </NavLink>
      </nav>

      {/* --- 4. Pie Institucional --- */}
      <div className="p-3 border-t border-white/10 text-center">
        <span className="text-[10px] text-zinc-400 flex items-center justify-center gap-1.5 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          INF-133 · Gestión II-2026
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
