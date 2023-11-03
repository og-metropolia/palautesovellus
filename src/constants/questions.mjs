import colors from './colors.mjs';

export const QUESTION_THEMES = Object.freeze({
  math: {
    id: 1,
    textId: 'dashboard.questionType.math',
    color: colors.blue,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  language: {
    id: 2,
    textId: 'dashboard.questionType.grammar',
    color: colors.red,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  play: {
    id: 3,
    textId: 'dashboard.questionType.play',
    color: colors.yellow,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  journey: {
    id: 4,
    textId: 'dashboard.questionType.trip',
    color: colors.green,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  sport: {
    id: 5,
    textId: 'dashboard.questionType.sport',
    color: colors.orange,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  task: {
    id: 6,
    textId: 'dashboard.questionType.exercise',
    color: colors.cyan,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  mood: {
    id: 7,
    textId: 'dashboard.questionType.mood',
    color: '#000',
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
});
