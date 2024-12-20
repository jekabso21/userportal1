import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import './Dashboard.css';
import { usePageTitle } from '../../hooks/usePageTitle';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const t = useTranslation();

  usePageTitle(t.dashboard.welcome);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">{t.dashboard.loading}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{t.dashboard.welcome}</h1>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} />
          {t.dashboard.logout}
        </button>
      </div>
      <div className="dashboard-content">
        <div className="user-info-card">
          <div className="user-info-header">
            <h2>{t.dashboard.userInfo}</h2>
          </div>
          <div className="user-info-body">
            <div className="info-item">
              <User className="info-icon" />
              <div>
                <h3>{t.auth.username}</h3>
                <p>{user.username || 'N/A'}</p>
              </div>
            </div>
            <div className="info-item">
              <Mail className="info-icon" />
              <div>
                <h3>{t.auth.email}</h3>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="info-item">
              <Calendar className="info-icon" />
              <div>
                <h3>{t.auth.age}</h3>
                <p>{user.age || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;