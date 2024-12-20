import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import defaultUsers from '../../data/users.json';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const t = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check default users
    const defaultUser = defaultUsers.defaultUsers.find(
      user => user.email === email && user.password === password
    );

    // Check localStorage for registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const registeredUser = registeredUsers.find(
      user => user.email === email && user.password === password
    );

    if (defaultUser || registeredUser) {
      const user = defaultUser || registeredUser;
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setError(t.auth.invalidCredentials || 'Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{t.auth.signIn}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">{t.auth.email}</label>
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input
                id="email"
                type="email"
                placeholder={t.auth.enterEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">{t.auth.password}</label>
            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                id="password"
                type="password"
                placeholder={t.auth.enterPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            {t.auth.submit}
            <ArrowRight className="button-icon" size={16} />
          </button>
        </form>
        <p className="auth-footer">
          {t.auth.noAccount}{' '}
          <Link to="/register" className="auth-link">
            {t.auth.signUpLink}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;