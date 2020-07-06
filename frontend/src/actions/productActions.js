const { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL } = require("../constant/productConstants")

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

const saveProduct = product => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const { userLogin: { userInfo } } = getState();

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      },
      body: JSON.stringify(product)
    });

    if (res.ok) {
      const data = await res.json();
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch(e) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: e.message });
  }
}

const detailsProducts = (productId) => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const res = await fetch(`/api/products/${productId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    }
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message })
  }
}

export { listProducts, detailsProducts, saveProduct };