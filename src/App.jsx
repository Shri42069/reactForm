import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import EmailVerificationPopup from './components/EmailVerificationPopup';

function App() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState('');

  const handleStartVerification = (email) => {
    setVerificationEmail(email);
    setShowVerification(true);
  };

  const handleVerificationComplete = () => {
    setShowVerification(false);
    setVerifiedEmail(verificationEmail);
    setIsLoginView(true); // Switch to login view
  };

  const handleVerificationClose = () => {
    setShowVerification(false);
  };

  return (
    <>
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
          
          {isLoginView ? (
            <LoginForm 
              prefillEmail={verifiedEmail}
              onLoginSuccess={() => setVerifiedEmail('')} // Clear the email after successful login
            />
          ) : (
            <SignupForm onStartVerification={handleStartVerification} />
          )}
        </div>
      </div>

      {showVerification && (
        <EmailVerificationPopup
          email={verificationEmail}
          onVerificationComplete={handleVerificationComplete}
          onClose={handleVerificationClose}
        />
      )}
    </>
  );
}

export default App;