import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CartPage from './pages/CartPage';
import AdminAddProduct from './pages/AdminAddProduct';
import './styles/Global.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='page-wrapper'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin/add-product" element={<AdminAddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;