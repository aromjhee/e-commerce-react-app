import jwt from 'jsonwebtoken';

import config from './config';

const getToken = user => {
  const { id, name, email, isAdmin } = user;
  return jwt.sign(
    { id, name, email, isAdmin }, 
    config.JWT_SECRET, 
    { expiresIn: '48h' }
  )
};

export {
  getToken
}