import jwt from 'jsonwebtoken';

import config from './config.js';

const getToken = user => {
  const { _id: id, name, email, isAdmin } = user;
  return jwt.sign(
    { id, name, email, isAdmin }, 
    config.JWT_SECRET, 
    { expiresIn: '48h' }
  )
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) res.status(401).send({ msg: 'Invalid Token.' });

      req.user = decode;
      next();
      return
    })
  } else {
    return res.status(401).send({ msg: 'Token is not supplied.' })
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: 'Admin Token is invalid.' })
}

export {
  getToken,
  isAuth,
  isAdmin
}