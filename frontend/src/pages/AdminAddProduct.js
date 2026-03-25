import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdminAddProduct.css';

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'homme',
    image: '',
    stock: '',
    rating: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [successCount, setSuccessCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        rating: parseFloat(formData.rating) || 0
      });

      const newCount = successCount + 1;
      setSuccessCount(newCount);
      
      setSuccess(`✅ Produit "${response.data.name}" ajouté avec succès! (Total: ${newCount})`);
      
      // Réinitialiser le formulaire SANS redirection
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'homme',
        image: '',
        stock: '',
        rating: ''
      });

      // Masquer le message après 3 secondes
      setTimeout(() => {
        setSuccess('');
      }, 3000);

    } catch (err) {
      setError(`❌ Erreur: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='admin-container'>
      <h1>➕ Ajouter un Produit</h1>
      
      {success && <div className='success-message'>{success}</div>}
      {error && <div className='error-message'>{error}</div>}

      <div className='counter'>
        <p>📊 Produits ajoutés: <strong>{successCount}</strong></p>
      </div>

      <form onSubmit={handleSubmit} className='product-form'>
        <div className='form-group'>
          <label>Nom du produit *</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Ex: Crème Hydratante'
            required
          />
        </div>

        <div className='form-group'>
          <label>Description *</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Décrivez votre produit...'
            required
            rows='4'
          />
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <label>Prix (€) *</label>
            <input
              type='number'
              name='price'
              value={formData.price}
              onChange={handleChange}
              placeholder='29.99'
              step='0.01'
              required
            />
          </div>

          <div className='form-group'>
            <label>Stock *</label>
            <input
              type='number'
              name='stock'
              value={formData.stock}
              onChange={handleChange}
              placeholder='50'
              required
            />
          </div>
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <label>Catégorie *</label>
            <select name='category' value={formData.category} onChange={handleChange}>
              <option value='homme'>👨 Pour Hommes</option>
              <option value='femme'>👩 Pour Femmes</option>
              <option value='unisexe'>✨ Unisexe</option>
            </select>
          </div>

          <div className='form-group'>
            <label>Note (0-5)</label>
            <input
              type='number'
              name='rating'
              value={formData.rating}
              onChange={handleChange}
              placeholder='4.5'
              step='0.1'
              min='0'
              max='5'
            />
          </div>
        </div>

        <div className='form-group'>
          <label>URL Image</label>
          <input
            type='url'
            name='image'
            value={formData.image}
            onChange={handleChange}
            placeholder='https://via.placeholder.com/300x300'
          />
          {formData.image && (
            <div className='image-preview'>
              <img src={formData.image} alt='Preview' />
            </div>
          )}
        </div>

        <button type='submit' disabled={loading} className='btn-submit'>
          {loading ? '⏳ Ajout en cours...' : '✅ Ajouter le Produit'}
        </button>

        <button type='button' className='btn-view-shop' onClick={() => window.location.href = '/shop'}>
          🛍️ Voir la boutique
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;