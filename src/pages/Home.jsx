import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #f8fafc 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 600, padding: '40px 20px' }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🏪</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#0f172a', marginBottom: 16, letterSpacing: -1 }}>
          Store Management System
        </h1>
        <p style={{ fontSize: 18, color: '#64748b', marginBottom: 32, lineHeight: 1.6 }}>
          A modern, efficient solution for managing your store's inventory, billing, and sales tracking.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          <div style={{ padding: 20, background: 'white', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📦</div>
            <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Inventory</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>Add, edit, and track products</p>
          </div>
          <div style={{ padding: 20, background: 'white', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>💳</div>
            <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Billing</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>Fast checkout with discounts & tax</p>
          </div>
          <div style={{ padding: 20, background: 'white', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📊</div>
            <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Reports</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>Track sales and revenue</p>
          </div>
          <div style={{ padding: 20, background: 'white', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
            <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Fast & Easy</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>Clean UI, no backend needed</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: 0.3,
              transition: 'all 0.3s'
            }} onMouseOver={e => e.target.style.transform = 'translateY(-2px)'} onMouseOut={e => e.target.style.transform = 'none'}>
              ✓ Login
            </button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '14px 32px',
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
            }} onMouseOver={e => e.target.style.transform = 'translateY(-2px)'} onMouseOut={e => e.target.style.transform = 'none'}>
              ➕ Register
            </button>
          </Link>
        </div>

        <p style={{ marginTop: 40, fontSize: 14, color: '#94a3b8' }}>
          Demo: Login with any email to access the store management system.
        </p>
      </div>
    </div>
  );
}
