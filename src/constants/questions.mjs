import colors from './colors.mjs';

export const QUESTION_THEMES = Object.freeze({
  math: {
    id: 1,
    displayName: 'Matematiikka',
    color: colors.blue,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  language: {
    id: 2,
    displayName: 'Äidinkieli',
    color: colors.red,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  play: {
    id: 3,
    displayName: 'Leikki',
    color: colors.yellow,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  journey: {
    id: 4,
    displayName: 'Retki',
    color: colors.green,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  sport: {
    id: 5,
    displayName: 'Liikunta',
    color: colors.orange,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  task: {
    id: 6,
    displayName: 'Tuntitehtävä',
    color: colors.cyan,
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
  mood: {
    id: 7,
    displayName: 'Tunnekysely',
    color: '#000',
    backgroundColor: '#fff',
    neutralColor: '#ddd',
  },
});
