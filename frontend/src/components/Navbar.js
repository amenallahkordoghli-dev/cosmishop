import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        {/* Logo */}
        <Link to='/' className='navbar-logo' onClick={closeMenu}>
          🧴 ComiShop
        </Link>

        {/* Hamburger Menu */}
        <div className='hamburger' onClick={toggleMenu}>
          <span className={isOpen ? 'active' : ''}></span>
          <span className={isOpen ? 'active' : ''}></span>
          <span className={isOpen ? 'active' : ''}></span>
        </div>

        {/* Menu */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className='nav-item'>
            <Link to='/' className='nav-link' onClick={closeMenu}>
              🏠 Accueil
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/shop' className='nav-link' onClick={closeMenu}>
              🛍️ Boutique
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/admin/add-product' className='nav-link' onClick={closeMenu}>
              ➕ Ajouter Produit
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/cart' className='nav-link nav-link-cart' onClick={closeMenu}>
              🛒 Panier
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/login' className='nav-link nav-link-login' onClick={closeMenu}>
              👤 Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;