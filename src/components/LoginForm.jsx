import React, { useState, useEffect } from 'react';
import './Forms.css';

function LoginForm({ prefillEmail, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isJustVerified, setIsJustVerified] = useState(false);
  
  // Update email when prefillEmail changes
  useEffect(() => {
    if (prefillEmail) {
      setFormData(prev => ({
        ...prev,
        email: prefillEmail
      }));
      setIsJustVerified(true);
      
      // Focus the password input when redirected from verification
      const passwordInput = document.getElementById('password');
      if (passwordInput) {
        passwordInput.focus();
      }
    }
  }, [prefillEmail]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Login form submitted:', formData);
      alert('Login form is valid! Check console for data.');
      onLoginSuccess(); // Clear the verified email from parent state
      setIsJustVerified(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {isJustVerified && (
        <div style={{
          backgroundColor: '#f0fdf4',
          color: '#166534',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          Email verified successfully! Please enter your password to continue.
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="input-with-icon">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            readOnly={isJustVerified} // Make email readonly when just verified
          />
          <span className="input-icon">✉️</span>
        </div>
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-with-icon">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          <span className="input-icon">🔒</span>
        </div>
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>
      
      <div className="form-footer">
        <a href="#" className="forgot-link">Forgot password?</a>
      </div>
      
      <button type="submit" className="submit-btn">
        <span>Login</span>
        <span className="btn-icon">→</span>
      </button>
    </form>
  );
}

export default LoginForm;