import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import setupAxiosInterceptors from "_setup/setupAxiosInterceptors";
import AppTheme from 'AppTheme';
import { ThemeProvider } from '@mui/material';
import Main from "_page/main/Main";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

setupAxiosInterceptors();

root.render(
  <ThemeProvider theme={AppTheme}>
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  </ThemeProvider>
);
