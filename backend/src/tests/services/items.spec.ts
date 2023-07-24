import { NoteController } from "../../note/note.controller";
import { NoteService } from "../../note/note.service";
import { NotePriority } from "../../note/constants/notes-priority.constant";
import { Note } from "../../note/entities/note.entity";

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
    service = new NoteService(Note);
  });
  it("Возврат массива заметок", async () => {
    const res = await service.getAll();
    expect(Note.findAll).toBeCalledTimes(1);
    expect(res).toEqual([testEntity]);
  });
  it("Возврат заметок по страницам", async () => {
    const pagedNotes = await service.getAllByPage(1, 10);
    expect(pagedNotes).toBeInstanceOf(Array);

    const [notesOnPage, allNoteCount] = pagedNotes;
    expect(notesOnPage).toBeInstanceOf(Array);
    expect(notesOnPage).toHaveLength(1);
    expect(allNoteCount).toBe(1);
  });
});
