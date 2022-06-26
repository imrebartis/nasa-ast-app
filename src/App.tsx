import * as React from 'react';
import { StrictMode } from 'react';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material';
import { lightTheme } from './themes/lightTheme';
import { SnackbarProvider } from 'notistack';
import Main from './components/Main';

const useStyles = makeStyles({
  snackbarContainer: {
    fontSize: '1.14rem',
    border: 'none',
    borderRadius: '0',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <StrictMode>
      <ThemeProvider theme={lightTheme}>
        <SnackbarProvider
          maxSnack={1}
          classes={{
            variantSuccess: classes.snackbarContainer,
            variantError: classes.snackbarContainer,
            variantWarning: classes.snackbarContainer,
            variantInfo: classes.snackbarContainer,
          }}
        >
          <Main />
        </SnackbarProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
