export const numberOfAnswers = 3;

export const flashCardsArray = [
  ['Correr', 'To run'],
  ['Nadar', 'To swim'],
  ['Escalar', 'To climb'],
  ['Volar', 'To fly'],
  ['Saltar', 'To jump'],
  ['Sentarse', 'To sit'],
  ['Dormirse', 'To sleep'],
  ['Descansar', 'To rest'],
  ['Levantarse', 'To rise'],
];

export const getUniqueSet = (count = 3, maxInt = 10) => {
  if (!Number.isInteger(count) || count < 1) {
    throw new Error('Count must be a positive integer.');
  }
  const indexes = [];
  while (indexes.length < count) {
    const nextNumber = Math.floor(Math.random() * maxInt);
    if (indexes.some((index) => index === nextNumber)) continue;
    indexes.push(nextNumber);
  }
  return indexes;
};

export const getPercentage = (correctCount, total) => {
  if (total < 1) {
    return '-';
  }
  return `${((correctCount / total) * 100).toFixed(2)}%`;
};
