import { Link } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { readableDate } from '../utils/assessment';
import { FiShield, FiAlertTriangle, FiCheckCircle, FiClock, FiArrowRight, FiSliders } from 'react-icons/fi';
import { MdOutlineSecurity } from 'react-icons/md';

// ============================================================================
// ============================================================================
// TABLERO DE CONTROL Y GESTIÓN DE POSTURA DE SEGURIDAD
// ============================================================================
// --- 1. The Pulse: Índice de madurez global y distribución de severidad ---
// --- 2. Indicadores Clave de Desempeño (KPIs de Ciberseguridad) ---
// --- 3. Cumplimiento por Dominio y Controles Prioritarios ---
// ============================================================================

export default function Dashboard() {
  const { result, record, completedActions } = useAssessment();

  // Controles que requieren atención y no han sido remediados aún
  const priority = [...result.categories]
    .filter((item) => item.score < 100 && !completedActions.includes(item.id))
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 3);

  // Desglose de severidad para la barra de distribución proporcional
  const highCount = result.categories.filter((c) => c.level === 'Alto').length;
  const medCount = result.categories.filter((c) => c.level === 'Medio').length;
  const lowCount = result.categories.filter((c) => c.level === 'Bajo').length;
  const totalCategories = result.categories.length;

  // --- Indicadores Clave de Desempeño (KPIs) ---
  const metrics = [
    {
      title: 'Índice de Madurez Global',
      value: `${result.score}%`,
      detail: result.score >= 75 ? 'Nivel Conforme' : result.score >= 50 ? 'Riesgo Moderado' : 'Riesgo Crítico',
      tone: result.score >= 75 ? 'text-emerald-500' : result.score >= 50 ? 'text-amber-500' : 'text-rose-500',
      icon: FiShield,
    },
    {
      title: 'Exposiciones Críticas / Altas',
      value: String(result.highRisks).padStart(2, '0'),
      detail: `${result.highRisks} dominio(s) con riesgo severo`,
      tone: result.highRisks > 0 ? 'text-rose-500' : 'text-emerald-500',
      icon: FiAlertTriangle,
    },
    {
      title: 'Controles Implementados',
      value: `${result.implemented} / 10`,
      detail: 'Verificados con política activa',
      tone: 'text-emerald-500',
      icon: FiCheckCircle,
    },
    {
      title: 'Remediaciones Pendientes',
      value: String(result.categories.filter((c) => c.score < 100 && !completedActions.includes(c.id)).length).padStart(2, '0'),
      detail: 'Acciones inmediatas requeridas',
      tone: 'text-amber-500',
      icon: MdOutlineSecurity,
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* 1. ENCABEZADO FORMAL INSTITUCIONAL (UMSA · INF-133) */}
      {/* === EJERCICIO 3 (EXAMEN): Mover o reordenar un elemento (Invertir posición de título y botones) === */}
      {/* ANTES: <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-4"> */}
      <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">
            Facultad de Ciencias Puras y Naturales · Carrera de Informática
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
            Tablero de Control y Postura de Seguridad
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Evaluación de controles defensivos para <strong className="text-zinc-800 dark:text-zinc-200">{record.unit}</strong> · Cátedra INF-133.
          </p>
        </div>

        {/* Botones de Acción Primaria */}
        {/* === EJERCICIO 5 (EXAMEN): Cambiar el espacio entre dos elementos (gap-2.5 -> gap-8) === */}
        {/* ANTES: <div className="flex items-center gap-2.5 shrink-0"> */}
        <div className="flex items-center gap-8 shrink-0">
          <Link
            to="/personalizar"
            className="h-9 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <FiSliders size={14} />
            <span>Parámetros</span>
          </Link>

          {/* === EJERCICIO 1 (EXAMEN): Cambiar un color (Verde esmeralda -> Violeta vibrante) === */}
          {/* ANTES:
          <Link
            to="/diagnostico"
            className="h-9 px-4 rounded-lg bg-secondary hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span>+ Nueva Auditoría</span>
          </Link>
          */}
          <Link
            to="/diagnostico"
            className="h-9 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span>+ Nueva Auditoría</span>
          </Link>
        </div>
      </div>

      {/* 2. THE PULSE & BARRA PROPORCIONAL DE SEVERIDAD (Estilo Senior Datadog / Snyk) */}
      {/* === EJERCICIO 4 (EXAMEN): Efecto hover (Elevación scale-[1.01], sombra shadow-xl y resplandor de borde) === */}
      {/* ANTES: <section className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-6 shadow-xs"> */}
      <section className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-6 shadow-xs hover:shadow-xl hover:scale-[1.01] hover:border-emerald-500/50 transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Lado Izquierdo: Gran cifra de Madurez con tipografía tabular */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
              Índice de Madurez de Seguridad (Posture Score)
            </span>
            <div className="flex items-baseline gap-3">
              {/* === EJERCICIO 2 (EXAMEN): Cambiar tamaño de texto (text-5xl -> text-7xl gigante) === */}
              {/* ANTES: <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white tabular-nums font-mono"> */}
              <span className="text-6xl sm:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white tabular-nums font-mono">
                {result.score}%
              </span>
              <span
                className={`text-xs font-mono px-2.5 py-1 rounded border font-semibold ${
                  result.score >= 75
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25'
                    : result.score >= 50
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25'
                }`}
              >
                {result.score >= 75 ? 'Nivel Conforme' : result.score >= 50 ? 'Riesgo Moderado' : 'Exposición Crítica'}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 pt-1">
              <FiClock size={13} />
              <span>Último registro de auditoría: {readableDate(record.date)}</span>
            </p>
          </div>

          {/* Lado Derecho: Barra proporcional de distribución de riesgos */}
          <div className="flex-1 lg:max-w-md space-y-2.5">
            <div className="flex justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <span>Distribución por Nivel de Riesgo</span>
              <span className="tabular-nums font-semibold text-zinc-700 dark:text-zinc-300">
                {totalCategories} Dominios Evaluados
              </span>
            </div>

            {/* Barra segmentada horizontal */}
            <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${(highCount / totalCategories) * 100}%` }}
                className="bg-rose-500 transition-all duration-300"
                title={`Riesgo Alto: ${highCount}`}
              />
              <div
                style={{ width: `${(medCount / totalCategories) * 100}%` }}
                className="bg-amber-400 transition-all duration-300"
                title={`Riesgo Medio: ${medCount}`}
              />
              <div
                style={{ width: `${(lowCount / totalCategories) * 100}%` }}
                className="bg-emerald-500 transition-all duration-300"
                title={`Riesgo Bajo: ${lowCount}`}
              />
            </div>

            {/* Leyenda técnica */}
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Alto: <strong className="text-zinc-800 dark:text-zinc-200 tabular-nums">{highCount}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Medio: <strong className="text-zinc-800 dark:text-zinc-200 tabular-nums">{medCount}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Bajo: <strong className="text-zinc-800 dark:text-zinc-200 tabular-nums">{lowCount}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. Indicadores Clave de Ciberseguridad (KPIs) --- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((kpi) => {
          const IconComponent = kpi.icon;
          return (
            <article
              key={kpi.title}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 shadow-xs transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {kpi.title}
                </span>
                <span className={`p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 ${kpi.tone}`}>
                  <IconComponent size={16} />
                </span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono tabular-nums">
                  {kpi.value}
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  {kpi.detail}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* 4. DOS PANELES INFERIORES: DOMINIOS Y TRATAMIENTO DE RIESGOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel A: Estado por Dominio de Seguridad (2 columnas) */}
        <section className="lg:col-span-2 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Cumplimiento por Dominio de Seguridad
              </h2>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Ponderación basada en los 10 controles evaluados
              </span>
            </div>
            <Link
              to="/riesgos"
              className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Matriz Completa</span>
              <FiArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-4">
            {result.categories.map((cat) => (
              <div key={cat.id} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    <span className="font-mono text-zinc-500 dark:text-zinc-400 mr-2">{cat.code}</span>
                    {cat.name}
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        cat.level === 'Alto'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : cat.level === 'Medio'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {cat.level}
                    </span>
                    <span className="tabular-nums font-semibold text-zinc-900 dark:text-zinc-100">
                      {cat.score}%
                    </span>
                  </div>
                </div>

                {/* Barra de progreso de cumplimiento */}
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${cat.score}%` }}
                    className={`h-full rounded-full transition-all duration-300 ${
                      cat.score >= 75
                        ? 'bg-emerald-500'
                        : cat.score >= 50
                        ? 'bg-amber-400'
                        : 'bg-rose-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Panel B: Prioridades de Remediación Inmediata (1 columna) */}
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-4">
              <div>
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  Prioridades de Remediación
                </h2>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Acciones de mayor impacto técnico
                </span>
              </div>
              <Link
                to="/recomendaciones"
                className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Ver Plan</span>
                <FiArrowRight size={13} />
              </Link>
            </div>

            <div className="space-y-3">
              {priority.length > 0 ? (
                priority.map((item, index) => (
                  <Link
                    key={item.id}
                    to={`/recomendaciones#${item.id}`}
                    className="block p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                      <span>0{index + 1} · {item.code}</span>
                      <span className="text-rose-600 dark:text-rose-400 font-semibold">{item.level}</span>
                    </div>
                    <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                      {item.action}
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                      Esfuerzo: {item.effort} · Impacto: {item.impact}/3
                    </p>
                  </Link>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
                  <FiCheckCircle size={28} className="mx-auto text-emerald-500 mb-2" />
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                    ¡Todos los controles implementados!
                  </p>
                  <p className="text-[11px] mt-1">
                    No existen acciones de remediación pendientes.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Nota de pie informativa */}
          <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            Fórmula: Riesgo = Probabilidad × Impacto
          </div>
        </section>

      </div>

    </div>
  );
}
