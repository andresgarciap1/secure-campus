import { useState } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { Badge, EmptyState, PageHeading, ProgressBar } from '../components/UI';
import Icon from '../components/Icon';
import { FiCheckCircle, FiInfo } from 'react-icons/fi';

// ============================================================================
// ============================================================================
// PLAN DE TRATAMIENTO Y REMEDIACIÓN DE VULNERABILIDADES
// ============================================================================
// --- 1. Filtrado reactivo: 'Todas', 'Pendientes' y 'Completadas' ---
// --- 2. Ordenamiento por severidad de riesgo técnico descendente ---
// --- 3. Trazabilidad: 'toggleAction(id)' actualiza el checklist de remediación ---
// ============================================================================

export default function Recommendations() {
  const { result, completedActions, toggleAction } = useAssessment();
  const [filter, setFilter] = useState('Todas');

  // Acciones ordenadas por severidad de riesgo técnico descendente
  const actions = [...result.categories]
    .filter((item) => item.score < 100)
    .sort((a, b) => b.riskScore - a.riskScore);

  const done = actions.filter((item) => completedActions.includes(item.id)).length;
  const progressPct = actions.length ? Math.round((done / actions.length) * 100) : 100;

  // Filtrado según la pestaña activa
  const shown = actions.filter((item) =>
    filter === 'Todas'
      ? true
      : filter === 'Completadas'
      ? completedActions.includes(item.id)
      : !completedActions.includes(item.id)
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. ENCABEZADO FORMAL */}
      <PageHeading
        eyebrow="PLAN DE ACCIÓN DE CIBERSEGURIDAD · INF-133"
        title="Plan de Remediación de Ciberseguridad"
        description="Medidas correctivas priorizadas por nivel de exposición técnica para mitigar vulnerabilidades."
      />

      {/* 2. RESUMEN DEL AVANCE DE REMEDIACIÓN */}
      <section className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1">
          <span className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
            <FiCheckCircle size={26} />
          </span>
          <div className="space-y-1.5 flex-1">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Progreso de Mitigación de Controles
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              {done} de {actions.length} medidas de remediación verificadas
            </p>
            <ProgressBar value={progressPct} label="Avance de remediación" />
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-3xl font-extrabold text-zinc-900 dark:text-white font-mono tabular-nums">
            {progressPct}%
          </span>
          <p className="text-[10px] text-zinc-400 font-mono">Mitigado</p>
        </div>
      </section>

      {/* 3. PESTAÑAS DE FILTRADO (Todas, Pendientes, Completadas) */}
      <div className="filter-tabs flex gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-fit" role="group" aria-label="Filtrar recomendaciones">
        {['Todas', 'Pendientes', 'Completadas'].map((item) => (
          <button
            key={item}
            aria-pressed={filter === item}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              filter === item
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* 4. LISTA DE MEDIDAS DE REMEDIACIÓN TÉCNICA */}
      <div className="recommendation-list space-y-4">
        {shown.map((item) => {
          const isDone = completedActions.includes(item.id);
          return (
            <article
              key={item.id}
              id={item.id}
              className={`p-5 rounded-xl border transition-all ${
                isDone
                  ? 'border-emerald-500/30 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05]'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <span className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Icon name={item.icon} size={22} />
                  </span>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-zinc-400">
                        {item.code}
                      </span>
                      <Badge level={item.level} />
                      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                        Esfuerzo: {item.effort}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-medium">
                        {item.name}
                      </span>
                    </div>

                    <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {item.action}
                    </h2>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </p>

                    {/* Pasos técnicos sugeridos */}
                    <details className="pt-2 text-xs">
                      <summary className="font-semibold text-emerald-600 dark:text-emerald-400 cursor-pointer hover:underline">
                        Ver pasos de implementación técnica
                      </summary>
                      <ol className="list-decimal list-inside space-y-1 pt-2 text-zinc-600 dark:text-zinc-400 pl-1">
                        {item.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </details>
                  </div>
                </div>

                {/* Control de Verificación */}
                <label className="completion-control shrink-0 flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleAction(item.id)}
                    className="rounded border-zinc-300 dark:border-zinc-700 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{isDone ? 'Mitigado' : 'Marcar Conforme'}</span>
                </label>
              </div>
            </article>
          );
        })}
      </div>

      {/* Estado vacío si no hay coincidencias */}
      {!shown.length && (
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center shadow-xs">
          <EmptyState
            title={
              actions.length
                ? 'No hay controles en esta vista'
                : '¡Todos los controles auditados están conformes!'
            }
            description={
              actions.length
                ? 'Cambia la pestaña de filtro para revisar el resto de las medidas.'
                : 'Excelente trabajo. La infraestructura cumple con los 10 controles defensivos.'
            }
          />
        </section>
      )}

      {/* Nota de pie */}
      <div className="demo-notice text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
        <FiInfo size={16} />
        <span>
          Marcar una acción registra el avance operativo de la remediación. Para recalcular formalmente el Índice de Madurez, ejecuta una nueva auditoría en el sistema.
        </span>
      </div>
    </div>
  );
}
