import Cookie from 'js-cookie';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constant/userConstants';

const logIn = (email, password) => async dispatch => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: {email, password}});
  try {
    const res = await fetch('/api/users/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data});
      Cookie.set('userInfo', JSON.stringify(data));
    }
  } catch(e) {
    dispatch({ type: USER_LOGIN_FAIL, payload: e.message });
  }
};

export { logIn };