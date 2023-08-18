import { useMediaQuery } from '@mui/material';

export const useTabletVersion = () => {
  return useMediaQuery('(min-width:800px)');
};
