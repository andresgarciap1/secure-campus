import { categories, questions } from '../data/security.js';

export const isAnswer = (value) => Number.isInteger(value) && value >= 0 && value <= 2;
export const isComplete = (answers) => questions.every(({ id }) => isAnswer(answers?.[id]));

// Modelo didáctico: preparación = puntos obtenidos / puntos posibles.
// Riesgo = probabilidad estimada (1–3) × impacto definido (1–3).
// No es una escala de auditoría certificada ni una medición de vulnerabilidades.
export function evaluateAssessment(answers) {
  if (!isComplete(answers)) throw new Error('Completa todas las preguntas antes de calcular.');
  const results = categories.map((category) => {
    const items = questions.filter((question) => question.category === category.id);
    const score = Math.round(items.reduce((total, question) => total + answers[question.id], 0) / (items.length * 2) * 100);
    const probability = score >= 75 ? 1 : score >= 50 ? 2 : 3;
    const riskScore = probability * category.impact;
    const level = riskScore >= 6 ? 'Alto' : riskScore >= 3 ? 'Medio' : 'Bajo';
    return { ...category, score, probability, riskScore, level };
  });
  const score = Math.round(questions.reduce((total, question) => total + answers[question.id], 0) / (questions.length * 2) * 100);
  return { score, categories: results, highRisks: results.filter((item) => item.level === 'Alto').length,
    implemented: questions.filter((question) => answers[question.id] === 2).length,
    pending: results.filter((item) => item.score < 100).length };
}

export function readableDate(value) {
  return value ? new Intl.DateTimeFormat('es-BO', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value)) : 'Escenario de ejemplo';
}
