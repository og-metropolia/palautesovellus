import { describe, it, expect } from 'vitest';

const API_URL = 'http://10.120.33.52:3000/api/v0';

describe('auth', () => {
  it('valid credentials', async () => {
    const response = fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `s@example.edu`,
        password: 'password',
        is_admin: false,
      }),
    }).then((res) => res.json());

    expect(await response).toEqual({
      code: 200,
      successful: true,
      user_id: 2,
    });
  });

  it('invalid credentials', async () => {
    const response = fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `this.user.does.not.exist@invalid.tld`,
        password: 'password',
        is_admin: false,
      }),
    }).then((res) => res.json());

    expect(await response).not.toEqual({
      code: 200,
      successful: true,
    });
  });
});

describe('get users', async () => {
  const response = fetch(`${API_URL}/users`).then((res) => res.json());
  const results = (await response).results;

  it('valid user', () => {
    expect(results[1].teacher_id).toEqual(2);
  });

  it('invalid user', () => {
    expect(results.length).not.toEqual(0);
  });
});

describe('create user', async () => {
  it('valid new user', async () => {
    const timestamp = new Date().getTime(); // used to make email unique
    const response = fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'Test',
        password: 'foobar',
        email: `test${timestamp}@example.com`,
      }),
    }).then((res) => res.json());
    expect((await response).code).toEqual(200);
  });

  it('existing user', async () => {
    const response = fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Sampo',
        lastName: 'Secret',
        password: 'foobar',
        email: `s@example.edu`,
      }),
    }).then((res) => res.json());
    expect((await response).code).not.toEqual(200);
  });
});

describe('create question', async () => {
  it('valid new question', async () => {
    const response = fetch(`${API_URL}/question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: 'This is a test question',
        answer_type: 1,
        theme: 1,
        session_id: 1,
      }),
    }).then((res) => res.json());
    expect((await response).code).toEqual(200);
  });

  it('invalid new question', async () => {
    const response = fetch(`${API_URL}/question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: 'This is a test question that should fail',
        answer_type: 1,
        theme: 1,
        session_id: 'not a number',
      }),
    }).then((res) => res.json());
    expect((await response).code).not.toEqual(200);
  });
});

describe('create session', async () => {
  it('valid new session', async () => {
    const response = fetch(`${API_URL}/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teacher_id: 1,
      }),
    }).then((res) => res.json());
    expect((await response).code).toEqual(200);
  });

  it('invalid new session', async () => {
    const response = fetch(`${API_URL}/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        not_teacher_id: 'not the correct field',
      }),
    }).then((res) => res.json());
    expect((await response).code).not.toEqual(200);
  });
});

describe('create answer', async () => {
  it('valid new answer', async () => {
    const response = fetch(`${API_URL}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question_id: 1,
        message: 'This is a test answer',
        responder: '00000000-0000-0000-0000-000000000000',
        moment: '2023-01-01 12:34:56',
      }),
    }).then((res) => res.json());
    expect((await response).code).toEqual(200);
  });

  it('invalid new answer', async () => {
    const response = fetch(`${API_URL}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Missing question id',
        responder: '00000000-0000-0000-0000-000000000000',
        moment: '2023-01-01 12:34:56',
      }),
    }).then((res) => res.json());
    expect((await response).code).not.toEqual(200);
  });
});

describe('get questions by session', async () => {
  it('valid session id', async () => {
    const response = fetch(`${API_URL}/question/?session_id=1`).then((res) =>
      res.json(),
    );
    expect((await response).code).toEqual(200);
  });

  it('invalid session id', async () => {
    const response = fetch(`${API_URL}/question/?session_id=123456789`).then(
      (res) => res.json(),
    );
    expect((await response).results.length).toEqual(0);
  });
});

describe('get sessions by teacher', async () => {
  it('valid teacher id', async () => {
    const response = fetch(`${API_URL}/session/?teacher_id=1`).then((res) =>
      res.json(),
    );
    expect((await response).code).toEqual(200);
  });

  it('invalid teacher id', async () => {
    const response = fetch(`${API_URL}/session/?teacher_id=123456789`).then(
      (res) => res.json(),
    );
    expect((await response).results.length).toEqual(0);
  });
});

describe('get answers by session', async () => {
  it('valid session id', async () => {
    const response = fetch(`${API_URL}/answer/?session_id=1`).then((res) =>
      res.json(),
    );
    expect((await response).code).toEqual(200);
  });

  it('invalid session id', async () => {
    const response = fetch(`${API_URL}/answer/?session_id=123456789`).then(
      (res) => res.json(),
    );
    expect((await response).results.length).toEqual(0);
  });
});

describe('delete user', async () => {
  it('valid session id', async () => {
    const timestamp = new Date().getTime(); // used to make email unique
    const createUserResponse = fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'Test',
        password: 'foobar',
        email: `test${timestamp}@example.com`,
      }),
    }).then((res) => res.json());

    const deleteUserResponse = fetch(
      `${API_URL}/users/${(await createUserResponse).id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      },
    ).then((res) => res.json());

    expect((await deleteUserResponse).code).toEqual(200);
  });
});
