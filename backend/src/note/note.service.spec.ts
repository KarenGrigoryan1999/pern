import { Test, TestingModule, JwtService } from '@nestjs/testing';
import { NoteService } from "./note.service";
import { NotePriority } from "./constants/notes-priority.constant";
import { Note } from "./entities/note.entity";

describe("Тестирование сервиса NoteService", () => {
  let service: NoteService;
  let testEntity;

  beforeEach(async () => {
    testEntity = {
      title: 'test entity',
      text: 'some text',
      priority: NotePriority.LOW
    };

    jest.spyOn(Note, 'findAll').mockResolvedValue([testEntity]);
    jest.spyOn(Note, 'count').mockResolvedValue(1);
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: 'Note',
          useValue: Note,
        },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });
  
  it("Получение полного списка заметок при помощи метода getAll. Ожидается что будет получен массив с записками", async () => {
    const res = await service.getAll();
    expect(Note.findAll).toBeCalledTimes(1);
    expect(res).toEqual([testEntity]);
  });

  it("Получение постраничного списка заметок при помощи метода getAllByPage. Ожидается получение десяти заметок, а также количества заметок в БД", async () => {
    const pagedNotes = await service.getAllByPage(1, 10);
    expect(pagedNotes).toBeInstanceOf(Array);

    const [notesOnPage, allNoteCount] = pagedNotes;
    expect(notesOnPage).toBeInstanceOf(Array);
    expect(notesOnPage).toHaveLength(1);
    expect(allNoteCount).toBe(1);
  });
});
