import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { demoAnswers, questions } from '../data/security';
import { evaluateAssessment, isAnswer, isComplete } from '../utils/assessment';

const AssessmentContext = createContext(null);
const demo = { answers: demoAnswers, mode: 'demo', date: null, unit: 'Unidad académica · Ejemplo' };
const validRecord = (value) => value && isComplete(value.answers)
  && ['demo', 'personal'].includes(value.mode) && typeof value.unit === 'string'
  && (value.date === null || (typeof value.date === 'string' && Number.isFinite(Date.parse(value.date))));
const validDraft = (value) => value && typeof value === 'object' && !Array.isArray(value)
  && Object.entries(value).every(([key, answer]) => questions.some((q) => q.id === key) && isAnswer(answer));

export function AssessmentProvider({ children }) {
  const [record, setRecord] = useLocalStorage('securecampus-result-v1', demo, validRecord);
  const [draft, setDraft] = useLocalStorage('securecampus-draft-v1', {}, validDraft);
  const [unitState, setUnitState] = useLocalStorage('securecampus-unit-v1', 'Unidad académica', (value) => typeof value === 'string' && value.length <= 80);
  const [completedActions, setCompletedActions] = useLocalStorage('securecampus-actions-v1', [],
    (value) => Array.isArray(value) && value.every((id) => ['access', 'backups', 'devices', 'awareness', 'response'].includes(id)));
  const result = useMemo(() => evaluateAssessment(record.answers), [record]);

  // Sincronizador de unidad: mantiene unit y record.unit idénticos
  const unit = record.unit || unitState;
  function setUnit(newUnit) {
    const val = typeof newUnit === 'string' ? newUnit : '';
    setUnitState(val);
    setRecord((prev) => ({ ...prev, unit: val }));
  }

  function submitAssessment() {
    if (!isComplete(draft) || !unit.trim()) return false;
    setRecord({ answers: { ...draft }, mode: 'personal', date: new Date().toISOString(), unit: unit.trim() });
    setCompletedActions([]);
    return true;
  }
  function toggleAction(id) {
    setCompletedActions((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);
  }
  function loadDemo() {
    setRecord(demo);
    setUnitState(demo.unit);
    setCompletedActions([]);
  }
  function loadScenario(scenarioAnswers, scenarioUnit = 'Simulación de Auditoría') {
    if (!isComplete(scenarioAnswers)) return;
    setUnitState(scenarioUnit);
    setRecord({ answers: { ...scenarioAnswers }, mode: 'demo', date: new Date().toISOString(), unit: scenarioUnit });
    setDraft({ ...scenarioAnswers });
    setCompletedActions([]);
  }
  function resetDraft() {
    setDraft({});
  }

  return <AssessmentContext.Provider value={{ record, result, draft, setDraft, unit, setUnit,
    submitAssessment, completedActions, toggleAction, loadDemo, loadScenario, resetDraft }}>{children}</AssessmentContext.Provider>;
}
export const useAssessment = () => useContext(AssessmentContext);
