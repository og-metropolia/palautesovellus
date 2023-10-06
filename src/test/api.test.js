import { describe, it, expect } from 'vitest';

describe('auth', () => {
  it('valid credentials', async () => {
    const response = fetch('http://localhost:3000/api/v0/auth', {
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
    const response = fetch('http://localhost:3000/api/v0/auth', {
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
  const response = fetch('http://localhost:3000/api/v0/users').then((res) =>
    res.json(),
  );
  const results = (await response).results;

  it('valid user', () => {
    console.log(results[1]);
    expect(results[1].teacher_id).toEqual(2);
  });

  it('invalid user', () => {
    expect(results.length).not.toEqual(0);
  });
});
