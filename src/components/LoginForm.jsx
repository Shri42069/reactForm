import React, { useState } from 'react';
import './Forms.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
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
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="auth-form">
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