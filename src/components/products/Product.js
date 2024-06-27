import React from 'react'
import './Product.css'

function Product({ name, price, quantity, category, image, onClick }) {


  return (
    <div className='productFlex' onClick={onClick}>
      <img className='product' src={image} alt="product" />
      <h3 className='productName'>{name}</h3>
      <p>Price: {price}</p>
      {quantity && <p>Quantity: {quantity}</p>}
      <p>{category}</p>
    </div>
  )
}

export default Product