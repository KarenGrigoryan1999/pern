import { Controller, Get, Post, Body, Req, Delete, Param, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDto } from './dto/note.dto';
import { Auth } from '../auth/roles-auth.decorator';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Auth('ADMIN')
  @Post()
  create(@Req() req, @Body() noteDto: NoteDto) {
    return this.notesService.create(noteDto, req.user.id);
  }

  @Get()
  async getAll() {
    return await this.notesService.getAll();
  }

  @Get('list')
  async getAllByPage(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return await this.notesService.getAllByPage(page, limit);
  } 

  @Delete(':id')
  async deleteOne(@Param('id') id) {
    return await this.notesService.delete(id);
  }
}
