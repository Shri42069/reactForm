import React, { useState } from 'react';
import './Forms.css';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    mobile: '',
    countryCode: '+91',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle age field as number
    if (name === 'age') {
      const numericValue = value === '' ? '' : parseInt(value, 10);
      setFormData({
        ...formData,
        [name]: numericValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name cannot exceed 100 characters';
    }
    
    // Age validation
    if (formData.age === '') {
      newErrors.age = 'Age is required';
    } else if (formData.age < 0) {
      newErrors.age = 'Age must be a positive number';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number should be 10 digits';
    }
    
    // Country code validation
    if (!formData.countryCode) {
      newErrors.countryCode = 'Country code is required';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must include at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must include at least one number';
    } else if (!/[@$!%*?&#]/.test(formData.password)) {
      newErrors.password = 'Password must include at least one special character (@$!%*?&#)';
    }
    
    // Confirm password validation
    if (formData.password && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submitData = {
        name: formData.name,
        age: Number(formData.age),
        email: formData.email,
        mobile: formData.mobile,
        countryCode: formData.countryCode,
        password: formData.password
      };
      
      console.log('Signup form submitted:', submitData);
      alert('Signup form is valid! Check console for data.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>
      
      <div className="form-row">
        <div className="form-group half">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="25"
          />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </div>
        
        <div className="form-group half">
          <label htmlFor="mobile">Mobile Number</label>
          <div className="phone-input">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="country-code"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+61">+61</option>
            </select>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="9876543210"
            />
          </div>
          {errors.mobile && <p className="error-text">{errors.mobile}</p>}
          {errors.countryCode && <p className="error-text">{errors.countryCode}</p>}
        </div>
      </div>
      
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
        <p className="helper-text">Min 8 characters with uppercase, number & special character</p>
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
        />
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
      </div>
      
      <button type="submit" className="submit-btn">
        <span>Create Account</span>
        <span className="btn-icon">→</span>
      </button>
    </form>
  );
}

export default SignupForm;