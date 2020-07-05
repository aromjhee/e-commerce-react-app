import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8080/api/products');
      if (res.ok) {
        console.log(res.data);
        setProducts(res.data);
      } else return
    }
    
    fetchData();
  }, [])

  return (
    <ul className="products">
      {products.map(product =>
        <li key={product.id}>
          <div className="product">
            <Link to={'/products/' + product.id}>
              <img className="product-image" src={product.image} alt="product1" />
            </Link>
            <div className="product-name">
              <Link to={'/products/' + product.id}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
          </div>
        </li>)}
    </ul>
  )
}

export default HomeScreen;