import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    login,
    register,
    demoLogin
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (authModalTab === 'login') {
        await login(email, password);
      } else {
        await register({ name, email, password, phone });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoClick = async (role) => {
    setError('');
    setSubmitting(true);
    try {
      await demoLogin(role);
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop open" onClick={closeAuthModal} />

      <div className="center-modal open">
        <div className="modal-header">
          <h3 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.5rem", color: "var(--color-primary-darker)" }}>
            {authModalTab === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h3>
          <button
            onClick={closeAuthModal}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", marginBottom: "24px" }}>
            <button
              onClick={() => {
                setAuthModalTab('login');
                setError('');
              }}
              style={{
                flex: 1,
                padding: '12px',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${authModalTab === 'login' ? 'var(--color-primary)' : 'transparent'}`,
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: authModalTab === 'login' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthModalTab('register');
                setError('');
              }}
              style={{
                flex: 1,
                padding: '12px',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${authModalTab === 'register' ? 'var(--color-primary)' : 'transparent'}`,
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: authModalTab === 'register' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              style={{ padding: "12px 16px", backgroundColor: "rgba(201, 74, 74, 0.1)", borderLeft: "3px solid var(--color-danger)", color: "var(--color-danger)", fontSize: "0.85rem", marginBottom: "20px", borderRadius: "var(--radius-sm)" }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {authModalTab === 'register' && (
              <>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Ramesh Varma"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="e.g. +91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "10px" }}
              disabled={submitting}
            >
              {submitting
                ? 'Processing...'
                : authModalTab === 'login'
                ? 'Sign In'
                : 'Create Account'}
            </button>
          </form>

          {/* Quick Demo Login Helpers */}
          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px dashed var(--color-border)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-muted)", marginBottom: "12px" }}>
              ⚡ Quick 1-Click Demo Login
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ flex: "1" }}
                onClick={() => handleDemoClick('admin')}
                disabled={submitting}
              >
                <ShieldCheck size={14} /> Demo Admin
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ flex: "1" }}
                onClick={() => handleDemoClick('customer')}
                disabled={submitting}
              >
                <UserIcon size={14} /> Demo Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
