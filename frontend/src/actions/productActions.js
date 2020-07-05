const { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } = require("../constant/productConstants")

const listProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST});
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
  }
}

export { listProducts };