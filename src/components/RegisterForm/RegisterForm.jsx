import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Calendar, ArrowRight, Check, X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { validateAge, validatePassword } from '../../utils/validation';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    numbers: false,
    symbol: false
  });
  
  const navigate = useNavigate();
  const t = useTranslation();

  useEffect(() => {
    setPasswordStrength(validatePassword(formData.password));
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, age } = formData;
    
    if (username && email && password && age) {
      if (!validateAge(age)) {
        setError(t.auth.ageRestriction || 'You must be 18 or older to register');
        return;
      }

      if (passwordStrength.length && passwordStrength.numbers && passwordStrength.symbol) {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        registeredUsers.push({ username, email, password, age });
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        localStorage.setItem('user', JSON.stringify({ username, email, age }));
        navigate('/dashboard');
      } else {
        setError(t.auth.passwordRequirements || 'Password does not meet the requirements');
      }
    } else {
      setError(t.auth.fillAllFields || 'Please fill in all fields');
    }
  };

  const renderPasswordStrength = (met) => {
    return met ? (
      <Check className="strength-icon strength-met" size={16} />
    ) : (
      <X className="strength-icon strength-unmet" size={16} />
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{t.auth.signUp}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">{t.auth.username}</label>
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                id="username"
                name="username"
                type="text"
                placeholder={t.auth.enterUsername}
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">{t.auth.email}</label>
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t.auth.enterEmail}
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                placeholder={t.auth.enterPassword}
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="password-strength">
              <div className="strength-item">
                {renderPasswordStrength(passwordStrength.length)}
                <span>{t.passwordStrength.length}</span>
              </div>
              <div className="strength-item">
                {renderPasswordStrength(passwordStrength.numbers)}
                <span>{t.passwordStrength.numbers}</span>
              </div>
              <div className="strength-item">
                {renderPasswordStrength(passwordStrength.symbol)}
                <span>{t.passwordStrength.symbol}</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="age" className="form-label">{t.auth.age}</label>
            <div className="input-group">
              <Calendar className="input-icon" size={20} />
              <input
                id="age"
                name="age"
                type="number"
                min="18"
                placeholder={t.auth.enterAge}
                value={formData.age}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            {t.auth.submitRegister}
            <ArrowRight className="button-icon" size={16} />
          </button>
        </form>
        <p className="auth-footer">
          {t.auth.hasAccount}{' '}
          <Link to="/login" className="auth-link">
            {t.auth.signInLink}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;