import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/common/Header';
import Routes from './Routes'; 

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
