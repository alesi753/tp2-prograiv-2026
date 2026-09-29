import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';
import { notify } from '../../src/services/notificationService';

// Simula el módulo completo de notificaciones
vi.mock('../../src/services/notificationService', () => ({
  notify: vi.fn(),
}));

describe('NoteService - createNote con notificación (Ejercicio 6)', () => {
  let service: NoteServiceImpl;
  let repo: SqliteNoteRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    const db = createDb(':memory:');
    repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('debe llamar a notify con la nota creada cuando pinned es true', () => {
    const result = service.createNote({
      title: 'Nota Fijada',
      content: 'Contenido',
      pinned: true,
    });

    expect(notify).toHaveBeenCalledTimes(1);
    expect(notify).toHaveBeenCalledWith(result);
  });

  it('NO debe llamar a notify cuando pinned es false', () => {
    service.createNote({
      title: 'Nota No Fijada',
      content: 'Contenido normal',
      pinned: false,
    });

    expect(notify).not.toHaveBeenCalled();
  });

  it('NO debe llamar a notify cuando la propiedad pinned no se envía', () => {
    service.createNote({
      title: 'Nota Estándar',
      content: 'Sin campo pinned',
    });

    expect(notify).not.toHaveBeenCalled();
  });
});