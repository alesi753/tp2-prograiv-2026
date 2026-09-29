import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - deleteNote (Ejercicio 5)', () => {
  let service: NoteServiceImpl;
  let repo: SqliteNoteRepository;

  beforeEach(() => {
    const db = createDb(':memory:');
    repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('elimina la nota existente y retorna true', () => {
    const note = repo.create({ title: 'Nota a borrar', content: 'Contenido descartable' });

    const result = service.deleteNote(note.id);

    expect(result).toBe(true);
    expect(repo.findById(note.id)).toBeUndefined();
  });

  it('retorna false al intentar eliminar un ID que no existe', () => {
    const result = service.deleteNote(9999);

    expect(result).toBe(false);
  });

  it('la nota eliminada ya no figura en el listado total (findAll)', () => {
    const note1 = repo.create({ title: 'Nota 1', content: 'C1' });
    const note2 = repo.create({ title: 'Nota 2', content: 'C2' });

    service.deleteNote(note1.id);

    const allNotes = repo.findAll();
    expect(allNotes).toHaveLength(1);
    expect(allNotes.some((n) => n.id === note1.id)).toBe(false);
    expect(allNotes.some((n) => n.id === note2.id)).toBe(true);
  });
});
