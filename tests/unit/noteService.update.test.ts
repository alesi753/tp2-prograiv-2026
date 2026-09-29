import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - updateNote (Ejercicio 4)', () => {
  let service: NoteServiceImpl;
  let repo: SqliteNoteRepository;

  beforeEach(() => {
    const db = createDb(':memory:');
    repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('actualiza parcialmente: si patch solo trae title, content no debe cambiar', () => {
    const baseNote = repo.create({ title: 'Título Original', content: 'Contenido Original' });
    
    const result = service.updateNote(baseNote.id, { title: 'Título Modificado' });

    expect(result).toBeDefined();
    expect(result?.title).toBe('Título Modificado');
    expect(result?.content).toBe('Contenido Original');
  });

  it('actualiza parcialmente: si patch solo trae content, title no debe cambiar', () => {
    const baseNote = repo.create({ title: 'Título Original', content: 'Contenido Original' });
    
    const result = service.updateNote(baseNote.id, { content: 'Contenido Modificado' });

    expect(result).toBeDefined();
    expect(result?.title).toBe('Título Original');
    expect(result?.content).toBe('Contenido Modificado');
  });

  it('retorna undefined al intentar actualizar un ID que no existe', () => {
    const result = service.updateNote(2389, { title: 'Fallo forzado' });
    expect(result).toBeUndefined();
  });
});