import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './Contexts/AuthContext';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    //<App />
  // </React.StrictMode>

  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>
  </React.StrictMode>
);


