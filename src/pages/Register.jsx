import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Store user in localStorage for demo purposes
    localStorage.setItem('user', JSON.stringify({ email, name }));
    onLogin({ email, name });
    navigate('/inventory');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #f8fafc 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ background: 'white', borderRadius: 12, padding: 40, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 60, textAlign: 'center', marginBottom: 24 }}>🚀</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', color: '#0f172a', marginBottom: 8 }}>Create Account</h1>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 32, fontSize: 14 }}>Sign up to start managing your store</p>

          {error && (
            <div style={{
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              color: '#7f1d1d',
              padding: '12px 16px',
              borderRadius: 8,
              marginBottom: 20,
              fontSize: 14,
              fontWeight: 500,
              borderLeft: '4px solid #ef4444'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#475569', fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.3 }}>
                👤 Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: 8,
                  fontSize: 14,
                  transition: 'all 0.3s',
                  background: 'white',
                  color: '#1e293b'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.background = 'rgba(37, 99, 235, 0.02)'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = 'white'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#475569', fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.3 }}>
                📧 Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: 8,
                  fontSize: 14,
                  transition: 'all 0.3s',
                  background: 'white',
                  color: '#1e293b'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.background = 'rgba(37, 99, 235, 0.02)'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = 'white'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#475569', fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.3 }}>
                🔑 Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: 8,
                  fontSize: 14,
                  transition: 'all 0.3s',
                  background: 'white',
                  color: '#1e293b'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.background = 'rgba(37, 99, 235, 0.02)'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = 'white'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#475569', fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.3 }}>
                ✓ Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: 8,
                  fontSize: 14,
                  transition: 'all 0.3s',
                  background: 'white',
                  color: '#1e293b'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.background = 'rgba(37, 99, 235, 0.02)'; e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = 'white'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: 0.3,
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)'; }}
              onMouseOut={(e) => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)'; }}
            >
              ➕ Create Account
            </button>
          </form>

          <p style={{ marginTop: 20, textAlign: 'center', color: '#64748b', fontSize: 14 }}>
            Already have an account? <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>Login here</Link>
          </p>

          <div style={{ marginTop: 24, padding: 16, background: '#dcfce7', borderRadius: 8, fontSize: 13, color: '#166534', lineHeight: 1.5 }}>
            <strong>✓ Demo Account:</strong><br/>
            Sign up with any valid email<br/>
            (No backend validation)
          </div>
        </div>
      </div>
    </div>
  );
}
