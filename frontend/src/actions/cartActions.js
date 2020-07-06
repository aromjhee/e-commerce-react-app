import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM } from "../constant/cartConstants";
import Cookie from 'js-cookie';

const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const res = await fetch(`/api/products/${id}`)
    if (res.ok) {
      const data = await res.json();
      dispatch({ 
        type: CART_ADD_ITEM, 
        payload: {
          product: data.id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty,
        }
      });
      const { cart: { cartItems } } = getState();
      Cookie.set('cartItems', JSON.stringify(cartItems));
    }
  } catch (error) {
    dispatch({ type: CART_ADD_ITEM_FAIL, payload: error.message });
  }
};

const removeFromCart = productId => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const { cart: { cartItems } } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
};

export { addToCart, removeFromCart };