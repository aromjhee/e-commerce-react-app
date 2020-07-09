import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../actions/userActions';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userLogin = useSelector(state => state.userLogin)
  const { loading, userInfo, error } = userLogin;

  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  console.log('========', userInfo)
  
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(logIn(email, password));
    // props.setStateUserLogin(userInfo);
  }

  return (
    <div className='form'>
      <form onSubmit={submitHandler}>
        <ul className='form-container'>
          <li>
            <h2>Log In</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor='email'>Email</label>
            <input 
              type='email' 
              name='email' 
              id='email' 
              onChange={e => setEmail(e.target.value)} />
          </li>
          <li>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              onChange={e => setPassword(e.target.value)} />
          </li>
          <li>
            <button type='submit' className='button primary full-width'>
              Log In</button>
          </li>
          <li>New to Imma-Zone?</li>
          <li>
            <Link 
              to={redirect === '/' ? 'register' : `register?redirect=${redirect}`}
              className='button text-center secondary'>
                  Create your Imma-zone account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default LoginScreen;