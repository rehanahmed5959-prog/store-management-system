import React from 'react';

export default function Receipt({ sale }) {
  if (!sale) return <div className="card"><h3>No receipt</h3></div>;

  return (
    <div className="card receipt">
      <h3>Receipt</h3>
      <div><strong>Sale ID:</strong> {sale.id}</div>
      <div><strong>Date:</strong> {new Date(sale.date).toLocaleString()}</div>
      <table className="table receipt-table">
        <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
        <tbody>
          {sale.items.map(it => (
            <tr key={it.id}><td>{it.name}</td><td>{it.quantity}</td><td>{it.price.toFixed(2)}</td><td>{(it.price * it.quantity).toFixed(2)}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="receipt-summary">
        <div>Subtotal: {sale.subtotal.toFixed(2)}</div>
        <div>Discount: {sale.discount.toFixed(2)}</div>
        <div>Tax: {sale.tax.toFixed(2)}</div>
        <div><strong>Total: {sale.total.toFixed(2)}</strong></div>
      </div>
    </div>
  );
}
