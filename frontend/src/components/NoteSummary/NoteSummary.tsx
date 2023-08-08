import { FC, memo } from 'react';
import { Box, Button, Card, Chip, Typography } from '@mui/material';
import { NOTE_PRIORITY } from '../CreateNoteForm/types';
import { CHIP_COLORS } from './types';
import { INoteWithId } from '../../store/reducers/notes/types';

interface INoteSummaryProps {
    note: INoteWithId;
    onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NoteSummary: FC<INoteSummaryProps> = memo(({ note, onRemove }) => {
    const {
        id,
        title,
        text,
        priority
    } = note;

    return (
        <Card sx={{ p: 2, mb: 1 }}>
            <Typography variant='h1'>{ title }</Typography>
            <Typography>{text}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Chip
                    label={NOTE_PRIORITY[priority]}
                    style={{ backgroundColor: CHIP_COLORS[priority] }}
                />
                <Button
                    onClick={onRemove}
                    color="error"
                    data-id={id}
                >
                    Remove
                </Button>
            </Box>
        </Card>
    );
});

export default NoteSummary;