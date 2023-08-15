import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Delete,
  Param,
  Query,
} from '@nestjs/common';

import { ROLES } from '../roles/constants/roles.constant';
import { Auth } from '../auth/roles-auth.decorator';

import { NotesService } from './notes.service';
import { NoteDto } from './dto/note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Auth(ROLES.ADMIN)
  @Post()
  create(@Req() req, @Body() noteDto: NoteDto) {
    return this.notesService.create(noteDto, req.user.id);
  }

  @Get()
  async getAll() {
    return await this.notesService.getAll();
  }

  @Get('list')
  async getAllByPage(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.notesService.getAllByPage(page, limit);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id) {
    return await this.notesService.delete(id);
  }
}
