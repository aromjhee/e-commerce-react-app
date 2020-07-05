const { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM } = require("../constant/cartConstants");

const cartReducer = (state = { cartItems: [] }, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find(x => x.product === item.product);
      if (product) {
        return { 
          cartItems: state.cartItems.map(
          x => x.product === product.product ? item : x
          )
        }
      }
      return { cartItems: [...state.cartItems, item] };
    case CART_ADD_ITEM_FAIL:
      return { error: action.payload };
    case CART_REMOVE_ITEM:
      return { cartItems: state.cartItems.filter(x => x.product !== action.payload)}
    default: return state;
  }
}

export { cartReducer };