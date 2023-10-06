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
