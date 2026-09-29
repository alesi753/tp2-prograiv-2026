import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { makeApp } from '../../src/app';

describe('GET /notes/:id (Ejercicio 3)', () => {
  let app: ReturnType<typeof makeApp>;

  beforeEach(() => {
    app = makeApp(':memory:');
  });

  it('devuelve 200 y la nota si el id existe', async () => {
    const created = await request(app)
      .post('/notes')
      .send({ title: 'A', content: 'B' });

    const res = await request(app).get(`/notes/${created.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(created.body.id);
    expect(res.body.title).toBe('A');
    expect(res.body.content).toBe('B');
  });

  it('devuelve 404 si el id no existe', async () => {
    const res = await request(app).get('/notes/9999');
    expect(res.status).toBe(404);
  });
});