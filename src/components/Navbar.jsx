import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onLogout, user }) {
  const loc = useLocation();
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: 0 }}>
        <li><Link className={loc.pathname === '/inventory' ? 'active' : ''} to="/inventory">📦 Inventory</Link></li>
        <li><Link className={loc.pathname === '/billing' ? 'active' : ''} to="/billing">💳 Billing</Link></li>
        <li><Link className={loc.pathname === '/reports' ? 'active' : ''} to="/reports">📊 Reports</Link></li>
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingRight: 16 }}>
        {user && <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>👤 {user.name}</span>}
        <button
          onClick={onLogout}
          style={{
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s',
            textTransform: 'uppercase',
            letterSpacing: 0.3
          }}
          onMouseOver={(e) => { e.target.style.background = 'rgba(255,255,255,0.3)'; }}
          onMouseOut={(e) => { e.target.style.background = 'rgba(255,255,255,0.2)'; }}
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}
