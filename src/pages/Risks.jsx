import { useState } from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { Badge, Button, EmptyState, PageHeading } from '../components/UI';
import { FiSearch, FiArrowRight, FiInfo } from 'react-icons/fi';

// ============================================================================
// MATRIZ CUANTITATIVA DE EXPOSICIÓN Y EVALUACIÓN DE RIESGOS
// ============================================================================
// --- Modelo de Cálculo: Riesgo = Probabilidad (1–3) × Impacto (1–3) ---
// --- Umbrales: Alto (6–9), Medio (3–5), Bajo (1–2) ---
// --- Correlación: Madurez >=75% (P=1), 50-74% (P=2), <50% (P=3) ---
// ============================================================================

export default function Risks() {
  const { result } = useAssessment();
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('Todos');

  // --- Filtrado reactivo por texto y nivel de riesgo ---
  const filtered = [...result.categories]
    .filter(
      (item) =>
        (level === 'Todos' || item.level === level) &&
        `${item.name} ${item.risk} ${item.code || ''}`
          .toLocaleLowerCase('es')
          .includes(search.toLocaleLowerCase('es'))
    )
    .sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. ENCABEZADO TÉCNICO FORMAL */}
      <PageHeading
        eyebrow="METODOLOGÍA DE EVALUACIÓN DE RIESGOS · INF-133"
        title="Matriz de Exposición y Amenazas"
        description="Correlación bidimensional entre la probabilidad estimada de explotación y el impacto operativo (Matriz 3×3)."
      >
        <Button to="/diagnostico" icon="clipboard">
          Nueva Auditoría
        </Button>
      </PageHeading>

      {/* 2. MATRIZ 3x3 Y REGLAS DE CÁLCULO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel A: Matriz Gráfica 3x3 */}
        <section className="lg:col-span-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs space-y-4">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Mapa Cuantitativo de Riesgo (3×3)
            </h2>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              Eje Y: Probabilidad (1 a 3) · Eje X: Impacto (1 a 3)
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="[writing-mode:vertical-rl] rotate-180 text-center text-[10px] font-mono tracking-widest text-zinc-500 dark:text-zinc-400 shrink-0">
              PROBABILIDAD →
            </span>
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                {[3, 2, 1].flatMap((probability) =>
                  [1, 2, 3].map((impact) => {
                    const count = result.categories.filter(
                      (item) => item.probability === probability && item.impact === impact
                    ).length;
                    const score = probability * impact;
                    const toneClass =
                      score >= 6
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                        : score >= 3
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';

                    return (
                      <div
                        key={`${probability}-${impact}`}
                        className={`p-3 rounded-lg border text-center font-mono ${toneClass}`}
                        title={`Probabilidad ${probability}, Impacto ${impact}: ${count} áreas`}
                      >
                        <small className="text-[10px] block opacity-85">
                          {score >= 6 ? 'Alto' : score >= 3 ? 'Medio' : 'Bajo'}
                        </small>
                        <strong className="text-xl font-bold block mt-1 tabular-nums">
                          {count || '—'}
                        </strong>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="text-center text-[10px] font-mono tracking-widest text-zinc-500 dark:text-zinc-400 pt-1">
                IMPACTO OPERATIVO →
              </div>
            </div>
          </div>
        </section>

        {/* Panel B: Reglas Metodológicas del Cálculo */}
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-semibold text-sm">
            <FiInfo size={17} className="text-emerald-500" />
            <span>Criterios del Algoritmo</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            La probabilidad es inversamente proporcional al índice de madurez alcanzado en la auditoría:
          </p>
          <ul className="text-xs font-mono text-zinc-600 dark:text-zinc-400 space-y-1 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <li>• Madurez ≥ 75%: Probabilidad 1 (Baja)</li>
            <li>• Madurez 50–74%: Probabilidad 2 (Media)</li>
            <li>• Madurez &lt; 50%: Probabilidad 3 (Alta)</li>
          </ul>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Fórmula: P × I = Riesgo (1–2 Bajo, 3–5 Medio, 6–9 Alto).
          </p>
        </section>
      </div>

      {/* 3. TABLA DE HALLAZGOS Y EVALUACIÓN POR DOMINIO */}
      <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>Resultados de la Evaluación de Riesgos</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              {filtered.length} dominios
            </span>
          </h2>

          {/* Filtros rápidos de búsqueda */}
          <div className="flex flex-wrap items-center gap-2">
            <label className="search-field relative flex items-center">
              <FiSearch size={14} className="absolute left-2.5 text-zinc-400" />
              <input
                aria-label="Buscar riesgo"
                placeholder="Buscar amenaza o dominio…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pl-8 pr-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden"
              />
            </label>

            <select
              aria-label="Filtrar por nivel de riesgo"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="h-8 px-2.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-800 dark:text-zinc-200 font-medium"
            >
              {['Todos', 'Alto', 'Medio', 'Bajo'].map((item) => (
                <option key={item} value={item}>
                  {item === 'Todos' ? 'Todos los Niveles' : `Nivel ${item}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla estructurada de hallazgos */}
        {filtered.length ? (
          <div className="table-scroll overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/75 dark:bg-zinc-900/80 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Amenaza y Dominio</th>
                  <th className="py-2.5 px-3 text-right">Madurez</th>
                  <th className="py-2.5 px-3 text-center">Probabilidad</th>
                  <th className="py-2.5 px-3 text-center">Impacto</th>
                  <th className="py-2.5 px-3 text-center">Severidad</th>
                  <th className="py-2.5 px-3 text-right">Remediación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-normal">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors"
                  >
                    {/* Código de Control */}
                    <td className="py-3 px-3 font-mono font-semibold text-zinc-500">
                      {item.code || 'DOM-00'}
                    </td>

                    {/* Amenaza */}
                    <td className="py-3 px-3">
                      <strong className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.risk}
                      </strong>
                      <small className="text-zinc-500 dark:text-zinc-400">{item.name}</small>
                    </td>

                    {/* Madurez Tabular */}
                    <td className="py-3 px-3 text-right font-mono font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                      {item.score}%
                    </td>

                    {/* Probabilidad */}
                    <td className="py-3 px-3 text-center font-mono text-zinc-600 dark:text-zinc-400">
                      {item.probability} / 3
                    </td>

                    {/* Impacto */}
                    <td className="py-3 px-3 text-center font-mono text-zinc-600 dark:text-zinc-400">
                      {item.impact} / 3
                    </td>

                    {/* Severidad Badge */}
                    <td className="py-3 px-3 text-center">
                      <Badge level={item.level} />
                    </td>

                    {/* Acción */}
                    <td className="py-3 px-3 text-right">
                      <Button
                        to={`/recomendaciones#${item.id}`}
                        variant="ghost"
                        aria-label={`Ver remediación para ${item.name}`}
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-medium"
                      >
                        <span className="hidden sm:inline">Tratar</span>
                        <FiArrowRight size={14} className="ml-1 inline" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No se encontraron coincidencias"
            description="Modifica los términos de búsqueda o selecciona otro nivel de severidad."
          />
        )}
      </section>
    </div>
  );
}
