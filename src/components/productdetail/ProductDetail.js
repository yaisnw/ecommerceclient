import React, { useEffect } from 'react'
import { addToCart, getFilteredProducts, getProductById, selectAddedToCart, selectFilteredProducts, selectProductDetail, selectQuantity, setAddedToCart, setQuantity } from './ProductDetailSlice'
import { useDispatch, useSelector } from 'react-redux'
import "./ProductDetail.css"
import { selectToken } from '../signup/loginSlice'
import cross from './cross-mark-svgrepo-com.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCard from '../products/ProductCard'
import "../products/Product.css"

function ProductDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filteredProducts = useSelector(selectFilteredProducts)
    const productDetail = useSelector(selectProductDetail);
    const quantity = useSelector(selectQuantity);
    const token = useSelector(selectToken);
    const addedToCart = useSelector(selectAddedToCart);
    const { id, name, description, price, category, image } = productDetail;
    const location = useLocation();

    useEffect(() => {
        dispatch(getFilteredProducts({id, category, token }))
    }, [dispatch,   id, category, token]);

    useEffect(() => {
        dispatch(setAddedToCart(false));
    }, [location, dispatch]);


    const handleQuantity = async (e) => {
        e.preventDefault()
        dispatch(setQuantity(e.target.value))
    }

    const handleAddToCart = async (e) => {
        e.preventDefault();
        dispatch(addToCart({ id, quantity, token }))
        dispatch(setAddedToCart(true));
    }
    console.log(filteredProducts)
    const productHandler = (e, id, token) => {
        e.preventDefault();
        dispatch(getProductById({ id, token }));
        navigate(`/home/products/${id}`);
    };
    return (
        <div className=''>
            {addedToCart &&
                <div className='cartFlex'>
                    <p className='cartNotification'>Added to cart!</p>
                    <img onClick={() => { dispatch(setAddedToCart(false)) }} src={cross} alt="" className='cross' />
                </div>
            }
            <div className="detailGrid">
                <h1>{name}</h1>
                <p>{category}</p>
                <form onSubmit={handleAddToCart} name="cartForm" className='cartForm'>
                    <label htmlFor='quantity'>Quantity:</label>
                    <input onChange={handleQuantity} name="quantity" type="number" min="1" max="10" className='qtyField' ></input>
                    <input className='add' value="Add to cart" type="submit"></input>
                </form>
                <img src={image} alt="product" className='img' />
                <p>{description}</p>
                <p>{price}</p>
            </div>
            <ul className='productsGrid'>
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        category={product.category}
                        image={product.image}
                        onClick={(e) => productHandler(e, product.id, token)}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ProductDetail