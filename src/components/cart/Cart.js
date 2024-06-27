import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartCall, checkout, deleteItem, selectCheckoutSuccess, selectHasError, selectcartItems, updateQuantity } from './CartSlice'
import { selectToken } from '../signup/loginSlice';
import Product from '../products/Product';
import './Cart.css'
import { getProductById } from '../productdetail/ProductDetailSlice';
import { Link, useNavigate } from 'react-router-dom';


function Cart() {
  const [noCart, setNoCart] = useState()
  const checkoutSuccess = useSelector(selectCheckoutSuccess)
  const hasError = useSelector(selectHasError)
  const navigate = useNavigate();
  const cartItems = useSelector(selectcartItems);
  const dispatch = useDispatch();
  const token = useSelector(selectToken)


  useEffect(() => {
    if (token) {
      dispatch(cartCall({ token }));

    }
    if (cartItems.length === 0) {
      setNoCart(true)
    }
  },)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(checkout(token))
  }
  const productHandler = (id, token) => {
    dispatch(getProductById({ id, token }))
    navigate(`/home/products/${id}`)
  }
  const handleQuantityChange = (id, quantity, token) => {
    // console.log(`Changing quantity for item ${id} to ${quantity} (type: ${typeof quantity})`);

    if (quantity === 0) {
      // console.log(`Dispatching deleteItem for item ${id}`);
      dispatch(deleteItem({ id, token }));
    } else {
      // console.log(`Dispatching updateQuantity for item ${id} to ${quantity}`);
      dispatch(updateQuantity({ id, quantity, token }));
    }
  };
  if (noCart) {
    return (
      <div>
        <p className='noCart'>You have no items in your cart currently, pleace proceed to <Link to="/home/products">the products page</Link></p>

      </div>
    )
  }
  else {
    return (
      <div >
        <form className='checkout' onSubmit={handleSubmit}>
          <label>Finish Checkout:</label>
          <button className='order' type="submit">Order</button>
        </form>
        <ul className='cartGrid'>
          {cartItems?.map((item) => (
            <div key={item.id} className="cartItem">
              <Product
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                category={item.category}
                image={item.image}
                onClick={() => productHandler(item.product_id, token)}
              />
              <div>
                <label htmlFor={`quantity-${item.id}`}>Quantity: </label>
                <select
                  style={{ fontFamily: "Roboto Mono" }}
                  id={`quantity-${item.id}`}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.product_id, Number(e.target.value), token)}
                >
                  <option value={0} >0(Remove)</option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </ul>

      </div>
    )
  }
}

export default Cart