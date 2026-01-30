import React, { useState } from 'react';

export default function ProductList({ inventory, updateProduct, deleteProduct }) {
  const [search, setSearch] = useState('');
  const [edits, setEdits] = useState({});

  const onChange = (id, field, value) => {
    setEdits(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const save = (id) => {
    const e = edits[id];
    if (!e) return;
    const price = parseFloat(e.price);
    const quantity = parseInt(e.quantity, 10);
    if (isNaN(price) || price < 0) return alert('Invalid price');
    if (isNaN(quantity) || quantity < 0) return alert('Invalid quantity');
    updateProduct(id, { price, quantity });
    setEdits(prev => { const copy = { ...prev }; delete copy[id]; return copy; });
  };

  const rows = inventory.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="card">
      <h3 className="card-title">📋 Products Inventory</h3>
      <div className="form-group" style={{ marginBottom: 16 }}>
        <input placeholder="🔍 Search by product name..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(p => (
            <tr key={p.id} className={p.quantity < 10 ? 'low-stock' : ''}>
              <td><strong>#{p.id}</strong></td>
              <td><strong>{p.name}</strong></td>
              <td>
                <input style={{ width: 90 }} value={edits[p.id]?.price ?? p.price} onChange={e => onChange(p.id, 'price', e.target.value)} type="number" step="0.01" />
              </td>
              <td>
                <input style={{ width: 80 }} value={edits[p.id]?.quantity ?? p.quantity} onChange={e => onChange(p.id, 'quantity', e.target.value)} type="number" />
                {p.quantity < 10 && <span className="badge badge-warning" style={{ marginLeft: 8 }}>Low Stock</span>}
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => save(p.id)} style={{ marginRight: 8 }}>✓ Save</button>
                <button className="btn btn-danger" onClick={() => { if (confirm('Delete product?')) deleteProduct(p.id); }}>✕ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="empty">No products found</div>}
    </div>
  );
}
