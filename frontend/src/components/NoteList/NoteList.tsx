import { useEffect, useCallback } from 'react';
import { Box, Pagination, Typography } from '@mui/material';

import {
  notesCountSelector,
  notesLimitSelector,
  notesLoadingStatus,
  notesSelector,
} from '../../store/selectors/notes';
import { useAppDispatch, useAppSelector, usePagination } from '../../hooks';
import { getPaginatedNotes, removeNote } from '../../store/thunks/notes';
import { INoteWithId } from '../../store/types';
import { LOADING_STATUS } from '../../store/types';
import NoteSummary from '../NoteSummary/NoteSummary';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function NoteList() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(notesSelector);
  const count = useAppSelector(notesCountSelector);
  const limit = useAppSelector(notesLimitSelector);
  const loadingStatus = useAppSelector(notesLoadingStatus);

  const { page, setPage, totalPages } = usePagination({
    contentPerPage: limit,
    count,
  });

  useEffect(() => {
    dispatch(getPaginatedNotes(page, limit));
  }, [page, limit, dispatch]);

  const onPageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onRemoveNote = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!(event.target instanceof HTMLButtonElement)) return;

      const noteId = event.target.dataset.id;
      if (noteId) {
        dispatch(removeNote(+noteId));
      }
    },
    [dispatch],
  );

  return (
    <Box>
      {loadingStatus === LOADING_STATUS.LOADING && <LoadingSpinner />}
      {loadingStatus === LOADING_STATUS.SUCCESS &&
        notes.map((noteElement: INoteWithId) => (
          <NoteSummary
            key={noteElement.id}
            note={noteElement}
            onRemove={onRemoveNote}
          />
        ))}
      <Box
        mt={2}
        sx={{ display: 'flex', flexDirection: 'column', alignnotes: 'center' }}
      >
        {loadingStatus === LOADING_STATUS.SUCCESS && (
          <Typography>Все заметки загружены!</Typography>
        )}
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
