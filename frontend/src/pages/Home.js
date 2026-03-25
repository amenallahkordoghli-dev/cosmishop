import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className='home'>
      {/* Hero Section */}
      <section className='hero'>
        <div className='hero-content'>
          <h1>🧴 Bienvenue sur ComiShop</h1>
          <p>Découvrez les meilleurs produits cosmétiques pour vous</p>
          <Link to='/shop' className='btn btn-primary btn-large'>
            Commencer vos achats
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className='categories'>
        <h2>Nos Catégories</h2>
        <div className='grid grid-3'>
          <div className='card category-card'>
            <h3>👨 Pour Hommes</h3>
            <p>Produits spécialement conçus pour les hommes</p>
            <Link to='/shop?category=homme' className='btn btn-secondary'>
              Explorer
            </Link>
          </div>
          <div className='card category-card'>
            <h3>👩 Pour Femmes</h3>
            <p>Produits spécialement conçus pour les femmes</p>
            <Link to='/shop?category=femme' className='btn btn-secondary'>
              Explorer
            </Link>
          </div>
          <div className='card category-card'>
            <h3>✨ Unisexe</h3>
            <p>Produits pour tous</p>
            <Link to='/shop?category=unisexe' className='btn btn-secondary'>
              Explorer
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='features'>
        <h2>Pourquoi ComiShop?</h2>
        <div className='grid grid-3'>
          <div className='card'>
            <h3>🚚 Livraison Rapide</h3>
            <p>Livraison en 2-3 jours partout en France</p>
          </div>
          <div className='card'>
            <h3>💯 Qualité Garantie</h3>
            <p>Tous nos produits sont vérifiés et authentiques</p>
          </div>
          <div className='card'>
            <h3>💳 Paiement Sécurisé</h3>
            <p>Paiement 100% sécurisé et protégé</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
