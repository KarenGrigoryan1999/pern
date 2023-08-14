import { useEffect } from 'react';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector, useTabletVersion } from '../../hooks';
import AuthForm from '../AuthForm/AuthForm';
import CreateNoteForm from '../CreateNoteForm/CreateNoteForm';
import NoteList from '../NoteList/NoteList';
import { whoAmI } from '../../store/thunks/auth';
import { authSelector } from '../../store/selectors/auth';
import { LOADING_STATUS } from '../../store/types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function ContentBlock() {
  const match = useTabletVersion();
  const dispatch = useAppDispatch();

  const { loadingStatus } = useAppSelector(authSelector);

  useEffect(() => {
    dispatch(whoAmI());
  }, [dispatch]);

  return (
    <>
      {loadingStatus === LOADING_STATUS.LOADING && <LoadingSpinner />}
      <Box
        sx={{
          margin: 'auto',
          width: `${match ? 60 : 90}%`,
        }}
      >
        {(loadingStatus === LOADING_STATUS.FAIL ||
          loadingStatus === LOADING_STATUS.ERROR) && <AuthForm />}
        {loadingStatus === LOADING_STATUS.SUCCESS && (
          <>
            <CreateNoteForm />
            <NoteList />
          </>
        )}
      </Box>
    </>
  );
}

export default ContentBlock;
