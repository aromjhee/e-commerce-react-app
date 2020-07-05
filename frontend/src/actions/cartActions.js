import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM } from "../constant/cartConstants";

const addToCart = (id, qty) => async dispatch => {
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
    }
  } catch (error) {
    dispatch({ type: CART_ADD_ITEM_FAIL, payload: error.message });
  }
};

const removeFromCart = productId => dispatch => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
};

export { addToCart, removeFromCart };