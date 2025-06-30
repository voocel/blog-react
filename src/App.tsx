import React from 'react';
import { AppRouter } from './router';
import ErrorBoundary from './components/ui/ErrorBoundary';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;