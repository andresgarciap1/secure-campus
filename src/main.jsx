import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AssessmentProvider } from './context/AssessmentContext';
// Punto de entrada: los providers comparten datos con todas las páginas.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AssessmentProvider><App /></AssessmentProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
