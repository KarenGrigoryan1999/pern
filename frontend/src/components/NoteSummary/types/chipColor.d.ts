import { colors } from '@mui/material';

import { NOTE_PRIORITY } from '../../CreateNoteForm/constants';

export const CHIP_COLORS: Record<
  NOTE_PRIORITY,
  (typeof colors.deepOrange)[keyof typeof colors.deepOrange]
> = {
  [NOTE_PRIORITY.LOW]: colors.deepOrange['300'],
  [NOTE_PRIORITY.MEDIUM]: colors.deepOrange['600'],
  [NOTE_PRIORITY.HIGH]: colors.deepOrange['700'],
  [NOTE_PRIORITY.URGENT]: colors.deepOrange['900'],
};
