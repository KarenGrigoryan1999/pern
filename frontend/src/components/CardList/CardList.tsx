import { FC, useEffect, useCallback } from "react";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector, usePagination } from "../../helpers/hooks";
import CardElement from "../CardElement/CardElement";
import { notesSelector } from "../../store/selectors/notes";
import { getPaginatedNotes, removeNotes } from "../../store/thunks/notes";
import { IRequestNote } from "../../store/reducers/notes/types";
import { LOADING_STATUS } from "../../store/constants";

const CardList: FC = () => {
    const dispatch = useAppDispatch();
    const {
        notes,
        limit,
        count,
        loadingStatus
    } = useAppSelector(notesSelector);

    const {
        page,
        setPage,
        totalPages,
      } = usePagination({
        contentPerPage: limit,
        count,
      });

    useEffect(() => {
        dispatch(getPaginatedNotes(page, limit));
    }, [page, limit]);

    const onPageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const removeNote = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        if (!(event.target instanceof HTMLButtonElement)) return;

        const noteId = event.target.dataset.id;
        if (noteId) {
            dispatch(removeNote(+noteId));
        }
    }, []);

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
                loadingStatus === LOADING_STATUS.SUCCESS && notes.map((noteElement: IRequestNote) => (
                    <CardElement
                        key={noteElement.id}
                        note={noteElement}
                        onRemove={removeNote}
                    />
                ))
            }
            <Box
                mt={2}
                sx={{ display: 'flex', flexDirection: 'column', alignnotes: 'center' }}
            >
                {
                    loadingStatus === LOADING_STATUS.SUCCESS && (<Typography>Все заметки загружены!</Typography>)
                }
                <Pagination
                    count={totalPages}
                    page={page}
                    color="primary"
                    onChange={onPageChange}
                />
            </Box>
        </Box>
    );
}

export default CardList;