import { Length, IsString, IsNumber } from 'class-validator';

import { NotePriority } from "../constants/notes-priority.constant";

export class NoteDto {
    @IsString({ message: "Введите корректный заголовок записи" })
    @Length(5, 40)
    title: string;

    @IsString({ message: "Введите корректный текст записи" })
    @Length(5, 255)
    text: string;

    @IsNumber()
    priority: NotePriority;
}
