import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ValidationExecption } from '../exceptions/validation.exception';

import { NoteDto } from './dto/note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note) private noteRepository: typeof Note) {}
  async create(noteDto: NoteDto, userId: string) {
    return this.noteRepository.create({
      ...noteDto,
      userId,
    });
  }

  async getAll() {
    return this.noteRepository.findAll();
  }

  async getOne(noteId: string) {
    return this.noteRepository.findByPk(noteId);
  }

  async getAllByPage(page: number, limit: number): Promise<[Note[], number]> {
    const offset = (page - 1) * limit;
    const notes = await this.noteRepository.findAll({
      limit,
      offset,
    });
    const totalCount = await this.noteRepository.count();
    return [notes, totalCount];
  }

  async delete(noteId: string) {
    const user = await this.noteRepository.findByPk(noteId);

    if (user != null) {
      await user.destroy();
      return {
        success: true,
      };
    } else {
      throw new ValidationExecption('Cannot find note');
    }
  }
}
