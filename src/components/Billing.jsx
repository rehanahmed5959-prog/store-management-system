import React, { useState } from 'react';
import Cart from './Cart.jsx';

export default function Billing({ inventory, addToCart, cart, updateCartItem, removeCartItem, checkout }) {
  const [selectedId, setSelectedId] = useState(inventory[0]?.id || null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');

  const handleAdd = () => {
    setError('');
    const res = addToCart(Number(selectedId), Number(qty));
    if (res?.error) setError(res.error); else { setQty(1); }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">💳 Billing Counter</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 24 }}>
        <div>
          <div className="card">
            <h3 className="card-title">➕ Add Items to Cart</h3>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label>Select Product</label>
              <select value={selectedId ?? ''} onChange={e => setSelectedId(e.target.value)}>
                {inventory.map(p => <option key={p.id} value={p.id}>{p.name} {p.quantity < 10 && '⚠️ Low Stock'} (Available: {p.quantity})</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" value={qty} onChange={e => setQty(e.target.value)} min="1" />
            </div>
            <button className="btn btn-primary" onClick={handleAdd} style={{ width: '100%', justifyContent: 'center' }}>➕ Add to Cart</button>
          </div>

          <div style={{ marginTop: 24 }} className="card">
            <h3 className="card-title">📦 Available Stock</h3>
            <table className="table">
              <thead><tr><th>Product</th><th>Price</th><th>Stock</th></tr></thead>
              <tbody>
                {inventory.length === 0 ? (
                  <tr><td colSpan="3" className="empty">No products available. Add from Inventory!</td></tr>
                ) : (
                  inventory.map(p => (
                    <tr key={p.id} className={p.quantity < 10 ? 'low-stock' : ''}>
                      <td><strong>{p.name}</strong></td>
                      <td>₹{p.price.toFixed(2)}</td>
                      <td>{p.quantity} {p.quantity < 10 && <span className="badge badge-warning">Low</span>}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Cart cart={cart} updateCartItem={updateCartItem} removeCartItem={removeCartItem} checkout={checkout} />
      </div>
    </div>
  );
}
