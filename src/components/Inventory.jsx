import React from 'react';
import ProductForm from './ProductForm.jsx';
import ProductList from './ProductList.jsx';

export default function Inventory({ inventory, addProduct, updateProduct, deleteProduct }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Inventory</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }}>
        <ProductForm onAdd={addProduct} />
        <ProductList inventory={inventory} updateProduct={updateProduct} deleteProduct={deleteProduct} />
      </div>
    </div>
  );
}
