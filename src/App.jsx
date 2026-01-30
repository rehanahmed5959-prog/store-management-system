import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Inventory from './components/Inventory.jsx';
import Billing from './components/Billing.jsx';
import SalesHistory from './components/SalesHistory.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css';

const initialInventory = [
  { id: 1, name: 'Pen', price: 10.0, quantity: 100 },
  { id: 2, name: 'Notebook', price: 50.0, quantity: 50 },
  { id: 3, name: 'Eraser', price: 5.0, quantity: 200 },
];

function App() {
  const [inventory, setInventory] = useState(initialInventory);
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([]);
  const [user, setUser] = useState(null);

  // Check if user is logged in from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Inventory handlers
  const addProduct = (product) => setInventory(prev => [...prev, { ...product, id: Date.now() }]);
  const updateProduct = (id, updates) => setInventory(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  const deleteProduct = (id) => setInventory(prev => prev.filter(p => p.id !== id));

  // Cart handlers
  const addToCart = (productId, qty) => {
    const prod = inventory.find(p => p.id === productId);
    if (!prod) return { error: 'Product not found' };
    if (qty <= 0) return { error: 'Quantity must be positive' };
    if (qty > prod.quantity) return { error: 'Not enough stock' };

    setCart(prev => {
      const ex = prev.find(i => i.id === productId);
      if (ex) return prev.map(i => i.id === productId ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { id: productId, name: prod.name, price: prod.price, qty }];
    });
    return { success: true };
  };

  const updateCartItem = (productId, qty) => {
    const prod = inventory.find(p => p.id === productId);
    if (!prod) return { error: 'Product not found' };
    if (qty <= 0) return { error: 'Quantity must be positive' };
    if (qty > prod.quantity) return { error: 'Not enough stock' };
    setCart(prev => prev.map(i => i.id === productId ? { ...i, qty } : i));
    return { success: true };
  };

  const removeCartItem = (productId) => setCart(prev => prev.filter(i => i.id !== productId));
  const clearCart = () => setCart([]);

  const checkout = () => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = subtotal > 5000 ? subtotal * 0.05 : 0;
    const tax = (subtotal - discount) * 0.08;
    const total = +(subtotal - discount + tax).toFixed(2);

    // Reduce inventory quantities
    setInventory(prev => prev.map(p => {
      const item = cart.find(c => c.id === p.id);
      if (!item) return p;
      return { ...p, quantity: p.quantity - item.qty };
    }));

    const saleRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      subtotal,
      discount,
      tax,
      total,
      items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.qty }))
    };
    setSales(prev => [saleRecord, ...prev]);
    clearCart();
    return saleRecord;
  };

  return (
    <BrowserRouter>
      <div className="app-root">
        {user && <Navbar onLogout={handleLogout} user={user} />}
        <main className="container">
          <Routes>
            {!user ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/inventory" replace />} />
                <Route path="/inventory" element={<Inventory inventory={inventory} addProduct={addProduct} updateProduct={updateProduct} deleteProduct={deleteProduct} />} />
                <Route path="/billing" element={<Billing inventory={inventory} addToCart={addToCart} cart={cart} updateCartItem={updateCartItem} removeCartItem={removeCartItem} checkout={checkout} />} />
                <Route path="/reports" element={<SalesHistory sales={sales} />} />
                <Route path="*" element={<Navigate to="/inventory" replace />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
