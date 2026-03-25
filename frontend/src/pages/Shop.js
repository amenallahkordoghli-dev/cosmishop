import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
    }
  };

  const filteredProducts = category
    ? products.filter(p => p.category === category)
    : products;

  if (loading) {
    return (
      <div className='shop'>
        <h1>🛍️ Boutique</h1>
        <div className='spinner'></div>
      </div>
    );
  }

  return (
    <div className='shop'>
      <h1>🛍️ Boutique</h1>

      {/* Filters */}
      <div className='filters'>
        <button
          className={`filter-btn ${category === '' ? 'active' : ''}`}
          onClick={() => setCategory('')}
        >
          Tous les produits
        </button>
        <button
          className={`filter-btn ${category === 'homme' ? 'active' : ''}`}
          onClick={() => setCategory('homme')}
        >
          👨 Pour Hommes
        </button>
        <button
          className={`filter-btn ${category === 'femme' ? 'active' : ''}`}
          onClick={() => setCategory('femme')}
        >
          👩 Pour Femmes
        </button>
        <button
          className={`filter-btn ${category === 'unisexe' ? 'active' : ''}`}
          onClick={() => setCategory('unisexe')}
        >
          ✨ Unisexe
        </button>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className='products-grid'>
          {filteredProducts.map(product => (
            <div key={product._id} className='card product-card'>
              {product.image && (
                <img src={product.image} alt={product.name} className='product-image' />
              )}
              <div className='product-info'>
                <h3>{product.name}</h3>
                <p className='product-description'>{product.description}</p>
                <div className='product-details'>
                  <span className='product-category'>{product.category}</span>
                  <span className='product-rating'>⭐ {product.rating}</span>
                </div>
                <div className='product-footer'>
                  <span className='product-price'>{product.price}€</span>
                  <span className='product-stock'>Stock: {product.stock}</span>
                </div>
                <button className='btn btn-primary btn-full'>
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='empty-state'>
          <p>😔 Aucun produit trouvé dans cette catégorie</p>
        </div>
      )}
    </div>
  );
};

export default Shop;