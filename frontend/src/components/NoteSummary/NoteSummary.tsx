import { FC, memo } from "react";
import { NOTE_PRIORITY } from "../CreateNoteForm/types";
import { Box, Button, Card, Chip, Typography } from "@mui/material";
import { CHIP_COLORS } from "./types";
import { IRequestNote } from "../../store/reducers/notes/types";

interface INoteSummaryProps {
    note: IRequestNote;
    onRemove: (event: any) => void;
}

const NoteSummary: FC<INoteSummaryProps> = ({ note, onRemove }) => {
    const { id, title, text, priority } = note;

    return (
        <Card sx={{ p: 2, mb: 1 }}>
            <Typography variant="h1">{title}</Typography>
            <Typography>{text}</Typography>
            <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
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
        </Card >
    );
}

export default memo(NoteSummary);