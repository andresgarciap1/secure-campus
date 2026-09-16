import { PageHeading } from '../components/UI';
import {
  FiCpu,
  FiDatabase,
  FiShield,
  FiLock,
  FiCheckCircle,
  FiBook,
  FiLayers,
  FiTerminal,
} from 'react-icons/fi';

// ============================================================================
// FICHA TÉCNICA: ESPECIFICACIÓN Y ARQUITECTURA DEL SISTEMA
// ============================================================================
// --- 1. Metadatos Institucionales ---
// --- 2. Especificación del Stack Frontend ---
// --- 3. Principios de Seguridad y Gobernanza ---
// ============================================================================

export default function About() {
  // --- Metadatos de Cátedra e Identidad Institucional ---
  const academicData = [
    { label: 'Institución', value: 'Universidad Mayor de San Andrés (UMSA)' },
    { label: 'Facultad / Carrera', value: 'Ciencias Puras y Naturales · Informática' },
    { label: 'Asignatura', value: 'INF-133 · Programación Web III' },
    { label: 'Docente', value: 'Lic. Jhonny Roberto Felipez Andrade' },
    { label: 'Gestión Académica', value: 'II-2026' },
    { label: 'Dominio de Aplicación', value: 'Auditoría y Gestión de Postura de Ciberseguridad' },
  ];

  // --- Especificación de Arquitectura de Software ---
  const techStack = [
    {
      icon: <FiLayers size={18} className="text-emerald-500" />,
      title: 'Frontend Framework',
      spec: 'React 19 + Vite 7',
      detail: 'Renderizado reactivo con Fast Refresh y empaquetado optimizado mediante Rollup.',
    },
    {
      icon: <FiCpu size={18} className="text-emerald-500" />,
      title: 'Motor de Estilos',
      spec: 'Tailwind CSS v4',
      detail: 'Tokens nativos @theme procesados en tiempo de compilación con zero-runtime.',
    },
    {
      icon: <FiDatabase size={18} className="text-emerald-500" />,
      title: 'Gestión de Estado',
      spec: 'React Context API',
      detail: 'Sincronización reactiva y desacoplada con persistencia segura en LocalStorage.',
    },
    {
      icon: <FiTerminal size={18} className="text-emerald-500" />,
      title: 'Aseguramiento de Calidad',
      spec: 'Node.js Test Runner',
      detail: 'Suite de pruebas matemáticas nativa con node:test y aserciones de consistencia.',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* --- Encabezado Técnico --- */}
      <PageHeading
        eyebrow="ESPECIFICACIÓN TÉCNICA · INF-133"
        title="Ficha Técnica del Sistema"
        description="Documentación de la arquitectura de componentes, estándares defensivos, gobernanza de datos y contexto institucional del sistema SecureCampus."
      />

      {/* --- Tabla de Metadatos Institucionales --- */}
      <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <FiBook className="text-emerald-600 dark:text-emerald-400" size={16} />
          <h2 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase font-mono">
            Identificación Institucional y Cátedra
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          {academicData.map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5">
              <span className="text-zinc-400 font-mono text-[10px] uppercase">
                {item.label}
              </span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --- Grilla de Arquitectura Frontend --- */}
      <div>
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono mb-3">
          Componentes de la Arquitectura
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {techStack.map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">
                  {item.title}
                </h3>
                <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block mb-2">
                  {item.spec}
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Principios de Gobernanza y Tratamiento de Información --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
            <FiShield size={16} />
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Modelo Didáctico
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Las ponderaciones de riesgo y madurez aplican reglas estructuradas de ciberseguridad
            para infraestructura universitaria, orientadas al diagnóstico institucional.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
            <FiLock size={16} />
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Privacidad y Soberanía Local
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Las respuestas y configuraciones se procesan estrictamente en el cliente
            mediante almacenamiento local, sin telemetría ni comunicación con servidores externos.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
            <FiCheckCircle size={16} />
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Diseño Modular
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            La interfaz implementa separación de responsabilidades con un Sidebar y Topbar
            desacoplados, facilitando el mantenimiento y la extensibilidad del código.
          </p>
        </div>
      </div>
    </div>
  );
}
