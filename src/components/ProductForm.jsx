import React, { useState } from 'react';

export default function ProductForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name.trim()) return setError('Product name required');
    const p = parseFloat(price);
    const q = parseInt(quantity, 10);
    if (isNaN(p) || p < 0) return setError('Price must be non-negative number');
    if (isNaN(q) || q < 0) return setError('Quantity must be non-negative integer');

    onAdd({ name: name.trim(), price: p, quantity: q });
    setSuccess(`✓ ${name} added successfully!`);
    setName(''); setPrice(''); setQuantity('');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3 className="card-title">➕ Add New Product</h3>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <div className="form-group">
        <label>📝 Product Name</label>
        <input placeholder="e.g., Pen, Notebook, Eraser" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>💵 Price</label>
        <input placeholder="0.00" value={price} onChange={e => setPrice(e.target.value)} type="number" step="0.01" min="0" />
      </div>
      <div className="form-group">
        <label>📦 Quantity</label>
        <input placeholder="0" value={quantity} onChange={e => setQuantity(e.target.value)} type="number" min="0" />
      </div>
      <button className="btn btn-success" type="submit" style={{ width: '100%', justifyContent: 'center' }}>➕ Add Product</button>
    </form>
  );
}
