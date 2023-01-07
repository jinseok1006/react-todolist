import { createTheme } from '@mui/material';

export default createTheme({
  typography: {
    fontFamily: 'noto sans kr',
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      color: 'grey',
      fontSize: 13,
      fontWeight: 400,
    },
  },
});

export const globalStyles = {
  body: {
    backgroundColor: '#f8f9fa',
  },
};
