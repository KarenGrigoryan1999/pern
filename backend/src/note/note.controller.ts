import { Controller, Get, Post, Body, Req, Delete, Param, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDto } from './dto/note.dto';
import { Auth } from '../auth/roles-auth.decorator';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Auth('ADMIN')
  @Post()
  create(@Req() req, @Body() noteDto: NoteDto) {
    return this.noteService.create(noteDto, req.user.id);
  }

  @Get()
  async getAll() {
    return await this.noteService.getAll();
  }

  @Get('list')
  async getAllByPage(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return await this.noteService.getAllByPage(page, limit);
  } 

  @Delete(':id')
  async deleteOne(@Param('id') id) {
    return await this.noteService.delete(id);
  }
}
