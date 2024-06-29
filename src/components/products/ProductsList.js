import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsCall, selectAllProducts } from './ProductsSlice'
import Product from './Product';
import "./Product.css";
import { getProductById } from '../productdetail/ProductDetailSlice';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../signup/loginSlice';


function ProductsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector(selectAllProducts);
    const token = useSelector(selectToken)
    // const isLoggedin = useSelector(selectisLoggedin);


    useEffect(() => {
        dispatch(productsCall(token))
        // eslint-disable-next-line
    }, [])

    const productHandler = (id, token) => {
        dispatch(getProductById({ id, token }))
        navigate(`/home/products/${id}`)
    }
    return (
        <ul className='productsGrid'>
            {allProducts?.map(product => <Product
                key={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                image={product.image}
                onClick={() => productHandler(product.id, token)}

            />)}
        </ul>
    )
}

export default ProductsList;