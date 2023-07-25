import { FC, memo } from "react";
import { ITEM_PRIORITY } from "../CreateItemForm/types";
import { Box, Button, Card, Chip, Typography } from "@mui/material";
import { CHIP_COLORS } from "./types";
import { IRequestItem } from "../../store/reducers/items/types";

interface ICardElementProps {
    item: IRequestItem;
    onRemove: (event: any) => void;
}

const CardElement: FC<ICardElementProps> = ({ item, onRemove }) => {
    const { id, title, text, priority } = item;

    return (
        <Card sx={{ p: 2, mb: 1 }}>
            <Typography variant="h1">{title}</Typography>
            <Typography>{text}</Typography>
            <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                <Chip
                    label={ITEM_PRIORITY[priority]}
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

export default memo(CardElement);