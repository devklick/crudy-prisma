import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import App from './app/app';
import { createTheme, ThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';
import { AppContextProvider } from './context/app-context';

const theme = createTheme();

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </ThemeProvider>
      </StrictMode>
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
