import React, { useEffect, useState } from 'react'
import { addToCart, selectAddedToCart, selectProductDetail, selectQuantity, setAddedToCart, setQuantity } from './ProductDetailSlice'
import { useDispatch, useSelector } from 'react-redux'
import "./ProductDetail.css"
import { selectToken } from '../signup/loginSlice'
import cross from './cross-mark-svgrepo-com.svg'
import { useNavigate } from 'react-router-dom'

function ProductDetail() {
    const dispatch = useDispatch();
    const productDetail = useSelector(selectProductDetail);
    const quantity = useSelector(selectQuantity);
    const token = useSelector(selectToken);
    const addedToCart = useSelector(selectAddedToCart);
    const navigate = useNavigate();
    const { id, name, description, price, category, image } = productDetail;

    const handleQuantity = async (e) => {
        e.preventDefault()
        dispatch(setQuantity(e.target.value))
    }

    const handleAddToCart = async (e) => {
        e.preventDefault();
        dispatch(addToCart({ id, quantity, token }))
        dispatch(setAddedToCart(true));
    }
    return (
        <div>
            <div className="detailFlex">
                <h1>{name}</h1>
                <p>{description}</p>
                <p>{price}</p>
                <p>{category}</p>
                <img src={image} alt="product" className='img' />
                <form onSubmit={handleAddToCart} name="cartForm">
                    <label htmlFor='quantity'>Quantity:</label>
                    <input onChange={handleQuantity} name="quantity" type="number" min="1" max="10" ></input>
                    <input value="Add to cart" type="submit"></input>
                </form>
            </div>
            {addedToCart &&
                <div className='cartFlex'>
                    <p className='cartNotification'>Added to cart!</p>
                    <img onClick={() => {dispatch(setAddedToCart(false))}} src={cross} alt="" className='cross'/> 
                </div>
            }
        </div>
    )
}

export default ProductDetail