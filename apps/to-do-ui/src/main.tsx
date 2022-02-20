import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import App from './app/app';
import { createTheme, ThemeProvider } from '@mui/material';
const theme = createTheme();

ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
