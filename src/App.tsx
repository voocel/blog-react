import React from 'react';
import { AppRouter } from './router';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import ToastContainer from './components/ui/ToastContainer';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppRouter />
        <ToastContainer />
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;