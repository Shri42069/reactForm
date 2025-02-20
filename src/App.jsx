import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="glow-line"></div>
        
        <div className="auth-header">
          <h2 className="gradient-text">
            {isLoginView ? 'Welcome Back' : 'Join Us Now'}
          </h2>
          <p className="subtitle">
            {isLoginView ? 'Sign in to your account' : 'Create your new account'}
          </p>
        </div>
        
        <div className="toggle-container">
          <button 
            className={`toggle-btn ${isLoginView ? 'active' : ''}`}
            onClick={() => setIsLoginView(true)}
          >
            Login
          </button>
          <button 
            className={`toggle-btn ${!isLoginView ? 'active' : ''}`}
            onClick={() => setIsLoginView(false)}
          >
            Sign Up
          </button>
        </div>
        
        {isLoginView ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}

export default App;