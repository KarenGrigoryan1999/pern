import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [SequelizeModule.forFeature([Note]), AuthModule],
})
export class NotesModule {}
