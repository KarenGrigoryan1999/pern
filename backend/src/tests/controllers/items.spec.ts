import { NoteController } from "../note/note.controller";
import { NoteService } from "../note/note.service";
import { NotePriority } from "../note/constants/notes-priority.constant";
import { Note } from "../note/entities/note.entity";

describe("Тестирование контроллера NoteController", () => {
  let controller: NoteController;
  let testEntity;

  beforeEach(async () => {
    testEntity = {
      title: 'test entity',
      text: 'some text',
      priority: NotePriority.LOW
    };

    jest.spyOn(Note, 'findAll').mockResolvedValue([testEntity]);
    jest.spyOn(Note, 'count').mockResolvedValue(1);
    controller = new NoteController(new NoteService(Note));
  });
  it("Возврат массива заметок", async () => {
    const res = await controller.getAll();
    expect(Note.findAll).toBeCalledTimes(1);
    expect(res).toEqual([testEntity]);
  });
  it("Возврат заметок по страницам", async () => {
    const pagedNotes = await controller.getAllByPage(1, 10);
    expect(pagedNotes).toHaveLength(2);
    expect(pagedNotes[0]).toHaveLength(1);
    expect(pagedNotes[1]).toBe(1);
  });
});
