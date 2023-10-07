export const ENDPOINTS = Object.freeze({
  users: 'user',
  auth: 'auth',
  session: 'session',
  question: 'question',
  answer: 'answer',
});

export const API_PATH = 'api/v0';

export const BASE_URL = import.meta.env
  ? import.meta.env.VITE_API_HOST +
    ':' +
    import.meta.env.VITE_API_PORT +
    '/' +
    API_PATH
  : `http://localhost:3000/${API_PATH}`;
