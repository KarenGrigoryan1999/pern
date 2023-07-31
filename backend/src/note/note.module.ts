import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Note } from './entities/note.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [SequelizeModule.forFeature([Note]), AuthModule]
})
export class NoteModule {}
