import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { createStore } from 'redux';
import { bookReducer } from './reducer/bookReducer';
import { Provider } from 'react-redux';




const theme = createTheme({
  palette:{
    mode:'dark'
  }

});


const store = createStore(bookReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App/>
      </ThemeProvider>
   </Provider>
  // </React.StrictMode>
);

