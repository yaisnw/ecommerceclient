import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsCall, selectAllProducts } from './ProductsSlice';
import ProductCard from './ProductCard';
import './Product.css';
import { getProductById, addToCart } from '../cro/ProductDetailSlice';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../signup/loginSlice';

function ProductsList() {
    const [addedToCartIds, setAddedToCartIds] = useState(new Set())
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector(selectAllProducts);
    const token = useSelector(selectToken);

    useEffect(() => {
        dispatch(productsCall(token));
    }, [dispatch, token]);

    const productHandler = (e, id, token) => {
        e.preventDefault();
        dispatch(getProductById({ id, token }));
        navigate(`/home/products/${id}`);
    };
    const handleAddToCart = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({id, quantity: 1, token}));
        setAddedToCartIds((prev) => new Set(prev).add(id));
    }
    return (
        <ul className='productsGrid'>
            {allProducts?.map(product => (
                <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    image={product.image}
                    onClick={(e) => productHandler(e, product.id, token)}
                    handleAddToCart={(e) => handleAddToCart(e, product.id)}
                    addedToCart={addedToCartIds.has(product.id)}
                    showAddToCart={true}
                />
            ))}
        </ul>
    );
}

export default ProductsList;
