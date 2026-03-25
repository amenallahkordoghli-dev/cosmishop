import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = React.useState([]);

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className='cart-page'>
      <h1>🛒 Mon Panier</h1>

      {cartItems.length === 0 ? (
        <div className='empty-cart'>
          <div className='empty-state'>
            <p>Votre panier est vide 😢</p>
            <Link to='/shop' className='btn btn-primary btn-large'>
              Continuer vos achats
            </Link>
          </div>
        </div>
      ) : (
        <div className='cart-container'>
          <div className='cart-items'>
            {cartItems.map(item => (
              <div key={item.id} className='card cart-item'>
                {item.image && <img src={item.image} alt={item.name} />}
                <div className='cart-item-info'>
                  <h3>{item.name}</h3>
                  <p className='cart-item-price'>{item.price}€</p>
                </div>
                <div className='cart-item-quantity'>
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </div>
                <div className='cart-item-total'>
                  {(item.price * item.quantity).toFixed(2)}€
                </div>
                <button
                  className='btn btn-danger'
                  onClick={() => handleRemoveItem(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <h2>Récapitulatif</h2>
            <div className='summary-line'>
              <span>Sous-total:</span>
              <span>{totalPrice.toFixed(2)}€</span>
            </div>
            <div className='summary-line'>
              <span>Livraison:</span>
              <span>Gratuite</span>
            </div>
            <div className='summary-line total'>
              <span>Total:</span>
              <span>{totalPrice.toFixed(2)}€</span>
            </div>
            <button className='btn btn-success btn-large btn-full'>
              Procéder au paiement
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
