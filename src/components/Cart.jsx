import React, { useMemo, useState } from 'react';

export default function Cart({ cart, updateCartItem, removeCartItem, checkout }) {
  const [error, setError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const discount = subtotal > 5000 ? subtotal * 0.05 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = +(subtotal - discount + tax).toFixed(2);

  const handleQty = (id, value) => {
    const q = parseInt(value, 10);
    if (isNaN(q) || q <= 0) { setError('Quantity must be positive'); return; }
    const res = updateCartItem(id, q);
    if (res?.error) setError(res.error); else setError('');
  };

  const handleCheckout = () => {
    if (cart.length === 0) { setError('Cart is empty'); return; }
    const sale = checkout();
    if (sale) {
      setCheckoutSuccess(true);
      setTimeout(() => setCheckoutSuccess(false), 4000);
    }
  };

  return (
    <div className="card">
      <h3 className="card-title">🛒 Shopping Cart</h3>
      {error && <div className="error">{error}</div>}
      {checkoutSuccess && <div className="success">✓ Order placed successfully! Total: ₹{total}</div>}
      {cart.length === 0 ? (
        <div className="empty">🛍️ Your cart is empty. Add items from Billing!</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr><th>Product</th><th>Qty</th><th>Price</th><th>Line Total</th><th>Action</th></tr>
            </thead>
            <tbody>
              {cart.map(i => (
                <tr key={i.id}>
                  <td><strong>{i.name}</strong></td>
                  <td><input style={{ width: 70 }} value={i.qty} onChange={e => handleQty(i.id, e.target.value)} type="number" /></td>
                  <td>₹{i.price.toFixed(2)}</td>
                  <td><strong>₹{(i.price * i.qty).toFixed(2)}</strong></td>
                  <td><button className="btn btn-danger" onClick={() => removeCartItem(i.id)}>✕ Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 24, padding: 16, background: '#f0f9ff', borderRadius: 8 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div><span style={{ color: 'var(--text-muted)' }}>Subtotal</span><br/><strong style={{ fontSize: 18 }}>₹{subtotal.toFixed(2)}</strong></div>
              {discount > 0 && <div><span style={{ color: 'var(--success)' }}>🎉 Discount (5%)</span><br/><strong style={{ fontSize: 18, color: 'var(--success)' }}>-₹{discount.toFixed(2)}</strong></div>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, paddingBottom: 16, borderBottom: '2px solid var(--border)' }}>
              <div><span style={{ color: 'var(--text-muted)' }}>Tax (8%)</span><br/><strong>₹{tax.toFixed(2)}</strong></div>
            </div>
            <div style={{ marginTop: 16, fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>
              Total: ₹{total}
            </div>
            <button className="btn btn-success" onClick={handleCheckout} style={{ width: '100%', marginTop: 16, justifyContent: 'center', fontSize: 16 }}>✓ Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}
