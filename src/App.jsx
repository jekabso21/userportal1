import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import { LanguageSwitch } from './components/LanguageSwitch';
import './styles/auth.css';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <LanguageSwitch />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;