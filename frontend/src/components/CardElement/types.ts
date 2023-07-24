import { colors } from "@mui/material";
import { ITEM_PRIORITY } from "../CreateItemForm/types";

export const CHIP_COLORS: Record<ITEM_PRIORITY, typeof colors.deepOrange[keyof typeof colors.deepOrange]> = {
    [ITEM_PRIORITY.LOW]: colors.deepOrange['300'],
    [ITEM_PRIORITY.MEDIUM]: colors.deepOrange['600'],
    [ITEM_PRIORITY.HIGH]: colors.deepOrange['700'],
    [ITEM_PRIORITY.URGENT]: colors.deepOrange['900'],
}
