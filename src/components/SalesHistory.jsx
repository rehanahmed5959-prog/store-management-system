import React from 'react';

export default function SalesHistory({ sales }) {
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const totalOrders = sales.length;

  return (
    <div className="page-container">
      <h2 className="page-title">📊 Sales Report</h2>
      
      {totalOrders > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          <div className="card">
            <div className="metric">
              <div className="metric-label">Total Orders</div>
              <div className="metric-value">{totalOrders}</div>
            </div>
          </div>
          <div className="card">
            <div className="metric">
              <div className="metric-label">Total Revenue</div>
              <div className="metric-value">₹{totalRevenue.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h3 className="card-title">📋 Order History</h3>
        {sales.length === 0 ? (
          <div className="empty">📭 No orders yet. Start billing to see your sales here!</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date & Time</th>
                <th>Items</th>
                <th>Subtotal</th>
                <th>Discount</th>
                <th>Tax</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(s => (
                <tr key={s.id}>
                  <td><strong>#{s.id.toString().slice(-8)}</strong></td>
                  <td>{new Date(s.date).toLocaleString()}</td>
                  <td><span className="badge badge-blue">{s.items.length} items</span></td>
                  <td>₹{s.subtotal.toFixed(2)}</td>
                  <td>{s.discount > 0 ? <span style={{ color: 'var(--success)' }}>-₹{s.discount.toFixed(2)}</span> : '—'}</td>
                  <td>₹{s.tax.toFixed(2)}</td>
                  <td><strong style={{ fontSize: 15, color: 'var(--primary)' }}>₹{s.total.toFixed(2)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
