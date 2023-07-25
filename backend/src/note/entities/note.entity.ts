import { ForeignKey } from 'sequelize-typescript';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { User } from '../../user/entities/user.entity';
import { NotePriority } from '../constants/notes-priority.constant';

interface NoteCreationAttrs {
    title: string;
    text: string;
    priority: NotePriority;
    userId: string;
  }

@Table({ tableName: "notes" })
export class Note extends Model<Note, NoteCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  priority: NotePriority;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  userId: number;
}
