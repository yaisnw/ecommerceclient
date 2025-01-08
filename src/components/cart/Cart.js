import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartCall, checkout, deleteItem, selectcartItems, updateQuantity } from './CartSlice'
import { selectToken } from '../signup/loginSlice';
import ProductCard from '../products/ProductCard';
import './Cart.css'
import { getProductById } from '../productDetail/ProductDetailSlice';
import { useNavigate } from 'react-router-dom';


function Cart() {
  const [noCart, setNoCart] = useState();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const cartItems = useSelector(selectcartItems);
  const dispatch = useDispatch();
  const token = useSelector(selectToken)



  useEffect(() => {
    if (token) {
      dispatch(cartCall({ token }));
    }
    else {
      navigate('/login')
    }
  }, [dispatch, token, navigate, cartItems]);


  useEffect(() => {
    if (cartItems && cartItems.length === 0) {
      setNoCart(true);
    } else {
      setNoCart(false);
    }
  }, [cartItems]);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(10, parseInt(e.target.value) || 1)); // Restrict input between 1 and 10
    setQuantity(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(checkout(token))
  }
  const productHandler = (id, token) => {
    dispatch(getProductById({ id, token }))
    navigate(`/home/products/${id}`)
  }
  const submitQuantity = async (e, id) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;
    if(action === 'remove') {
      dispatch(deleteItem({id, token}))
    }
    else if(action === 'confirm') {
      dispatch(updateQuantity({id, quantity, token}))
    }
  };
  if (noCart) {
    return (
      <div >
        <div className='noCartContainer'>
          <p className='noCart'>You have no items in your cart currently.</p>
          <button onClick={() => navigate('/home/products')}>Shop now</button>
        </div>
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
            <div key={item.id} >
              <div>
                <ProductCard
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  category={item.category}
                  image={item.image}
                  onClick={() => productHandler(item.product_id, token)}
                  showAddToCartButton={false}
                />
              </div>
              <form className="quantityForm" onSubmit={(e) => submitQuantity(e, item.product_id)}>
                <label>Quantity: </label>
                <input
                type="number" 
                name="quantity"
                min="1"
                max="10"
                onChange={handleQuantityChange}
                className='qtyField'
                />
                <input type='submit' name="confirm" value="Confirm" className="qtyButton"/>
                <input type='submit' name="remove" value="Remove" className="qtyButton"/>
              </form>
            </div>
          ))}
        </ul>

      </div>
    )
  }
}

export default Cart