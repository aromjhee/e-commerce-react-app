import React, { useEffect } from 'react';
import Cookie from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../actions/userActions';

const ProfileScreen = (props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logOut());
    props.history.push('/');
  }

  return (
    <div className='profile'>
      <h3 className='profile title'>Profile</h3>
      <div>
        <button onClick={handleClick}className='button primary'>
          Log Out
        </button>
      </div>
    </div>
  )
}

export default ProfileScreen;