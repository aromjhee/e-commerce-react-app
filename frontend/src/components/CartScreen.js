import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = props => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const { id } = useParams();
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [id, qty, dispatch]);

  return (
    <div className='cart'>
      <div className='cart-list'>
        <ul className='cart-list-container'>
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {
            cartItems.length === 0 ? (
              <div>Cart is Empty</div>
            ) :
            cartItems.map(item => (
              <li key={item.product}>
                <div className='cart-image'>
                  <img src={item.image} alt='product' />
                </div>
                <div className='cart-name'>
                  <div>
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </div>
                  <div> Qty: 
                    <select 
                      value={item.qty} 
                      onChange={e => dispatch(addToCart(item.product, e.target.value))}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                    </select>
                    <button 
                      type='button'
                      onClick={() => removeFromCartHandler(item.product)}
                      className='button'>
                        Delete
                    </button>
                  </div>
                </div>
                <div className='cart-price'>
                  ${item.price}
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className='cart-action'>
        <h3>
          SubTotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items):
          ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button className='button primary' disabled={cartItems.length === 0}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default CartScreen;