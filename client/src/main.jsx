import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext.jsx';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      AppContextProvider,
      null,
      React.createElement(App)
    )
  )
);
