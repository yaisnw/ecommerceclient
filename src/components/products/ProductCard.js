import React from 'react';
import './Product.css';

function ProductCard({key, name, price, quantity, category, image, onClick, handleAddToCart, addedToCart, showAddToCart }) {
  return (
    <div className='product-card' onClick={onClick}>
      <div className='imageBox'>
        <img src={image} alt="product" />
      </div>
      <h3 className='product-name'>{name}</h3>
      <p className='price'>Price: {price}</p>
      {quantity && <p>Quantity: {quantity}</p>}
      <p className='category'>{category}</p>
      {showAddToCart && (addedToCart ? <p className="added-text">Added to Cart</p> : <button className="add" onClick={handleAddToCart}>Add to Cart</button>)}

    </div>
  );
}

export default ProductCard;
