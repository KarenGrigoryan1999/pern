import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAppSelector, useTabletVersion } from '../../hooks';
import { authSelector } from '../../store/selectors/auth';
import { LOADING_STATUS } from '../../store/types';
import CreateNoteForm from '../../components/CreateNoteForm/CreateNoteForm';
import NoteList from '../../components/NoteList/NoteList';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function MainPage() {
  const match = useTabletVersion();
  const navigate = useNavigate();

  const { loadingStatus } = useAppSelector(authSelector);

  useEffect(() => {
    if (
      loadingStatus === LOADING_STATUS.ERROR
      || loadingStatus === LOADING_STATUS.FAIL
    ) {
      navigate('/auth');
    }
  }, [loadingStatus]);

  return (
    <>
      {loadingStatus === LOADING_STATUS.LOADING && <LoadingSpinner />}
      <Box
        sx={{
          margin: 'auto',
          width: `${match ? 60 : 90}%`,
        }}
      >
        <CreateNoteForm />
        <NoteList />
      </Box>
    </>
  );
}

export default MainPage;
