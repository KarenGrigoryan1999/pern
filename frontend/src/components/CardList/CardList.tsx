import { FC, useEffect, useCallback } from "react";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import CardElement from "../CardElement/CardElement";
import { itemsSelector } from "../../store/selectors/items";
import { getPaginatedItems, removeItem } from "../../store/thunks/items";
import { IRequestItem } from "../../store/reducers/items/types";
import { LOADING_STATUS } from "../../store/constants";
import { setItemsPage } from "../../store/actions/items";

const CardList: FC = () => {
    const dispatch = useAppDispatch();
    const {
        items,
        page,
        limit,
        count,
        loadingStatus
    } = useAppSelector(itemsSelector);

    const pageCount = Math.ceil(count/limit);

    const onPageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setItemsPage(value));
    }

    const removeNote = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        if (!(event.target instanceof HTMLButtonElement)) return;

        const noteId = event.target.dataset.id;
        if (noteId) {
            dispatch(removeItem(+noteId));
        }
    }, []);
  
    useEffect(() => {
      dispatch(getPaginatedItems(page, limit));
    }, [page, limit]);
    
    return (
        <Box>
            {
                loadingStatus === LOADING_STATUS.LOADING && (
                    <Box
                        mt={2}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <CircularProgress role="progressbar" />
                    </Box>
                )
            }
            {
                loadingStatus === LOADING_STATUS.SUCCESS && items.map((itemElement: IRequestItem) => (
                    <CardElement
                        key={itemElement.id}
                        item={itemElement}
                        onRemove={removeNote}
                    />
                ))
            }
        <Box
            mt={2}
            sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
            {
                loadingStatus === LOADING_STATUS.SUCCESS && (<Typography>Все заметки загружены!</Typography>)
            }
            <Pagination
                count={pageCount}
                page={page}
                color="primary"
                onChange={onPageChange}
            />
        </Box>
        </Box>
    );
}

export default CardList;