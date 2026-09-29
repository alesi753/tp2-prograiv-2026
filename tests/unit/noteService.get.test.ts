import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - getNote (Ejercicio 3)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('devuelve la nota si el id existe', () => {
    const created = service.createNote({ title: 'A', content: 'B' });
    const found = service.getNote(created.id);
    expect(found?.id).toBe(created.id);
    expect(found?.title).toBe('A');
    expect(found?.content).toBe('B');
  });

  it('devuelve undefined si el id no existe', () => {
    expect(service.getNote(9999)).toBeUndefined();
  });
});