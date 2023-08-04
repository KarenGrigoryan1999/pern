import { FC, useEffect, useCallback } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector, usePagination } from "../../helpers/hooks";
import NoteSummary from "../NoteSummary/NoteSummary";
import { notesSelector } from "../../store/selectors/notes";
import { getPaginatedNotes, removeNote } from "../../store/thunks/notes";
import { IRequestNote } from "../../store/reducers/notes/types";
import { LOADING_STATUS } from "../../store/constants";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const NoteList: FC = () => {
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

    const onRemoveNote = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        if (!(event.target instanceof HTMLButtonElement)) return;

        const noteId = event.target.dataset.id;
        if (noteId) {
            dispatch(removeNote(+noteId));
        }
    }, []);

    return (
        <Box>
            {
                loadingStatus === LOADING_STATUS.LOADING && <LoadingSpinner />
            }
            {
                loadingStatus === LOADING_STATUS.SUCCESS && notes.map((noteElement: IRequestNote) => (
                    <NoteSummary
                        key={noteElement.id}
                        note={noteElement}
                        onRemove={onRemoveNote}
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

export default NoteList;