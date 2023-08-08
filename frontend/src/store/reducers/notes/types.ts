import { NOTE_PRIORITY } from '../../../components/CreateNoteForm/types';

export interface INote {
    title: string;
    text: string;
    priority: NOTE_PRIORITY;
}

export interface INoteWithId extends INote {
    id: number;
}
