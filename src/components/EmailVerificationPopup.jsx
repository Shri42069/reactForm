import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';

const EmailVerificationPopup = ({ email, onVerificationComplete, onClose }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(0);

  // Debounced resend function with countdown
  const handleResendCode = useCallback(async () => {
    if (resendTimeout > 0) return;

    setIsResending(true);
    setError('');

    try {
      // Simulate API call - Replace with actual resend code API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVerificationCode(['', '', '', '', '', '']);
      
      // Start 30 second countdown
      setResendTimeout(30);
      const countdownInterval = setInterval(() => {
        setResendTimeout(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      alert('New verification code sent!');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  }, [resendTimeout]);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    setVerificationCode(prev => {
      const newCode = [...prev];
      newCode[index] = value;
      return newCode;
    });

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        setVerificationCode(prev => {
          const newCode = [...prev];
          newCode[index - 1] = '';
          return newCode;
        });
      }
    }
  };

  const handleVerify = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter the complete verification code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call - Replace with actual verification API
      await new Promise(resolve => setTimeout(resolve, 1500));
      onVerificationComplete();
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999, // Ensure it's above everything
      backdropFilter: 'blur(4px)' // Optional: adds a blur effect to the background
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        width: '90%',
        maxWidth: '440px',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '16px',
            top: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          <X size={20} color="#666" />
        </button>

        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 600, 
          marginBottom: '12px',
          color: '#1a1a1a'
        }}>
          Verify Your Email
        </h3>
        <p style={{ 
          color: '#666', 
          marginBottom: '24px',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          We've sent a verification code to {email}. Please enter it below.
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '24px', 
          justifyContent: 'center' 
        }}>
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              style={{
                width: '50px',
                height: '50px',
                textAlign: 'center',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '20px',
                fontWeight: 600,
                transition: 'all 0.2s',
                outline: 'none',
                ':focus': {
                  borderColor: '#2563eb',
                  boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)'
                }
              }}
            />
          ))}
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px' 
        }}>
          <button
            onClick={handleVerify}
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              fontSize: '16px',
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>

          <button
            onClick={handleResendCode}
            disabled={isResending || resendTimeout > 0}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              cursor: (isResending || resendTimeout > 0) ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              opacity: (isResending || resendTimeout > 0) ? 0.7 : 1,
              padding: '8px'
            }}
          >
            {isResending 
              ? 'Sending...' 
              : resendTimeout > 0 
                ? `Resend code in ${resendTimeout}s`
                : "Didn't receive the code? Resend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPopup;