import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAssessment, isComplete } from '../src/utils/assessment.js';
import { demoAnswers, questions } from '../src/data/security.js';

const answersWith = (value) => Object.fromEntries(questions.map(({ id }) => [id, value]));

test('El ejemplo inicial produce 65%, cuatro controles implementados y un riesgo alto', () => {
  const result = evaluateAssessment(demoAnswers);
  assert.equal(result.score, 65);
  assert.equal(result.implemented, 4);
  assert.equal(result.highRisks, 1);
  assert.equal(result.categories.find((item) => item.id === 'awareness').level, 'Alto');
});
test('Todos los controles implementados producen 100% sin acciones pendientes', () => {
  const result = evaluateAssessment(answersWith(2));
  assert.equal(result.score, 100);
  assert.equal(result.pending, 0);
  assert.equal(result.highRisks, 0);
});
test('Una evaluación sin controles produce 0% y cinco riesgos altos', () => {
  const result = evaluateAssessment(answersWith(0));
  assert.equal(result.score, 0);
  assert.equal(result.highRisks, 5);
  assert.equal(result.pending, 5);
});
test('No se calculan resultados incompletos o con valores fuera de rango', () => {
  for (const answers of [{}, { ...demoAnswers, 'access-1': 3 }, { ...demoAnswers, 'access-1': '2' }, { ...demoAnswers, 'access-1': null }]) {
    assert.equal(isComplete(answers), false);
    assert.throws(() => evaluateAssessment(answers));
  }
});
test('Las prioridades respetan los umbrales del modelo didáctico', () => {
  const result = evaluateAssessment(answersWith(1));
  assert.equal(result.score, 50);
  assert.equal(result.categories.find((item) => item.id === 'access').level, 'Alto');
  assert.equal(result.categories.find((item) => item.id === 'devices').level, 'Medio');
});
