import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { NoteDto } from './dto/note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note) private noteRepository: typeof Note) {}
  async create(noteDto: NoteDto, userId: string) {
    return await this.noteRepository.create({
      ...noteDto,
      userId,
    });
  }

  async getAll() {
    return await this.noteRepository.findAll();
  }

  async getOne(noteId: string) {
    return await this.noteRepository.findByPk(noteId);
  }

  async getAllByPage(page: number, limit: number): Promise<[Note[], number]> {
    const offset = (page - 1) * limit;
    const users = await this.noteRepository.findAll({
      limit,
      offset,
    });
    const totalCount = await this.noteRepository.count();
    return [users, totalCount];
  }

  async delete(noteId: string) {
    const user = await this.noteRepository.findByPk(noteId);

    if(user) {
      await user.destroy();
      return {
        success: true,
      }
    } else {
      throw new HttpException('Cannot find note', HttpStatus.NOT_FOUND);
    }
  }
}
