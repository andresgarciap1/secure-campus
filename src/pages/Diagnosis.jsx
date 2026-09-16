import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, questions, answerOptions } from '../data/security';
import { useAssessment } from '../context/AssessmentContext';
import { PageHeading, ProgressBar } from '../components/UI';
import Icon from '../components/Icon';
import { isAnswer } from '../utils/assessment';
import { FiCheck, FiArrowRight, FiArrowLeft, FiAlertCircle, FiInfo } from 'react-icons/fi';

// ============================================================================
// AUDITORÍA DE CONTROLES DEFENSIVOS (Flujo Paso a Paso)
// ============================================================================
// --- 1. Control de flujo y pasos por dominios (0 a 4) ---
// --- 2. Validación de completitud de respuestas ---
// --- 3. Persistencia reactiva del borrador técnico en LocalStorage ---
// ============================================================================

export default function Diagnosis() {
  const { draft, setDraft, unit, setUnit, submitAssessment } = useAssessment();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const category = categories[step];
  const currentQuestions = questions.filter((question) => question.category === category.id);
  const answered = questions.filter((question) => isAnswer(draft[question.id])).length;

  // --- Validación de respuestas requeridas por paso ---
  function handleNext(event) {
    event.preventDefault();
    if (!unit.trim()) {
      setError('Por favor indica la unidad académica evaluada.');
      return;
    }
    if (!currentQuestions.every((question) => isAnswer(draft[question.id]))) {
      setError('Debes evaluar ambos controles de esta categoría para continuar.');
      return;
    }
    setError('');
    if (step < categories.length - 1) {
      setStep(step + 1);
    } else if (submitAssessment()) {
      navigate('/');
    } else {
      setError('Existen preguntas sin responder en categorías anteriores.');
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. ENCABEZADO TÉCNICO FORMAL */}
      <PageHeading
        eyebrow="RÚBRICA DE EVALUACIÓN TÉCNICA · INF-133"
        title="Auditoría de Controles de Ciberseguridad"
        description="Evaluación sistemática de 10 controles defensivos basados en estándares internacionales."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 2. BARRA DE PASOS / RECORRIDO DE AUDITORÍA */}
        <aside className="md:col-span-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-4 shadow-xs h-fit">
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono tracking-wider uppercase font-bold block">
            DOMINIOS DE SEGURIDAD
          </span>
          <div className="space-y-1">
            {categories.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-2 rounded-lg text-xs transition-colors ${
                  index === step
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                    : index < step
                    ? 'text-zinc-700 dark:text-zinc-300'
                    : 'text-zinc-400 dark:text-zinc-500'
                }`}
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] bg-zinc-100 dark:bg-zinc-800">
                  {index < step ? <FiCheck size={12} className="text-emerald-500" /> : index + 1}
                </span>
                <div>
                  <span className="font-medium text-xs block">{item.short}</span>
                  <small className="font-mono text-[10px] opacity-75">
                    {index < step ? 'Auditado' : index === step ? 'En curso' : 'Pendiente'}
                  </small>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
            <FiInfo size={16} className="shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Borrador técnico con persistencia local en navegador.
            </p>
          </div>
        </aside>

        {/* 3. FORMULARIO CONTROLADO DE EVALUACIÓN */}
        <form className="md:col-span-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-6 shadow-xs" onSubmit={handleNext} noValidate>
          {/* Progreso cuantitativo */}
          <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
            <span>Dominio {step + 1} de {categories.length} ({category.code})</span>
            <span>{answered} / {questions.length} Controles Evaluados</span>
          </div>
          <ProgressBar value={(answered / questions.length) * 100} label="Progreso de evaluación" />

          {/* Título de la Categoría Activa */}
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <span className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Icon name={category.icon} size={24} />
            </span>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {category.name}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {category.description}
              </p>
            </div>
          </div>

          {/* Campo de Dependencia (En paso 0 editable, en pasos siguientes visible) */}
          {step === 0 ? (
            <label className="space-y-1 block">
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Dependencia o Unidad Académica Evaluada
              </span>
              <input
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                maxLength={80}
                placeholder="Ej. Laboratorio de Informática - Monoblock Central"
                required
                className="w-full h-9 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-emerald-500"
              />
              <small className="text-[11px] text-zinc-500 dark:text-zinc-400 block">
                Identificador oficial que figurará en el encabezado del reporte.
              </small>
            </label>
          ) : (
            <div className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span>Unidad evaluada: <strong className="text-zinc-800 dark:text-zinc-200">{unit}</strong></span>
              <button type="button" onClick={() => setStep(0)} className="text-emerald-600 hover:underline text-[11px] font-medium cursor-pointer">Editar</button>
            </div>
          )}

          {/* Lista de Controles del Dominio Actual */}
          <div className="space-y-6">
            {currentQuestions.map((question) => (
              <fieldset className="question space-y-2" key={question.id}>
                <legend className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-[10px] text-zinc-700 dark:text-zinc-300">
                    {question.code}
                  </span>
                  <span>{question.text}</span>
                </legend>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 italic">
                  {question.hint}
                </p>

                {/* Opciones de respuesta (0, 1, 2) */}
                <div className="answer-options grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {answerOptions.map((option) => {
                    const isSelected = draft[question.id] === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`answer-option p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15'
                            : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          checked={isSelected}
                          onChange={() => {
                            setDraft((prev) => ({ ...prev, [question.id]: option.value }));
                            setError('');
                          }}
                          className="sr-only"
                        />
                        <span className="block">
                          <strong className="block text-xs font-bold text-zinc-900 dark:text-zinc-100">
                            {option.label}
                          </strong>
                          <small className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 block leading-tight">
                            {option.description}
                          </small>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          {/* Mensaje de Error de Validación */}
          {error && (
            <div className="p-3 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2" role="alert">
              <FiAlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {/* Botones de Navegación del Flujo */}
          <div className="form-actions flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => {
                setStep(step - 1);
                setError('');
              }}
              className="h-9 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 disabled:opacity-40 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <FiArrowLeft size={14} />
              <span>Anterior</span>
            </button>

            <button
              type="submit"
              className="h-9 px-4 rounded-lg bg-secondary hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>{step === categories.length - 1 ? 'Finalizar y Ver Tablero' : 'Siguiente Dominio'}</span>
              <FiArrowRight size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
