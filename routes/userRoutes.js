import express from 'express';

import User from '../models/userModel.js';
import { getToken } from '../util.js';

const router = express.Router();

router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'admin',
      email: 'admin@admin.com',
      password: '1234',
      isAdmin: true,
    });
  
    const newUser = await user.save();
    res.send(newUser);
  } catch(e) {
    res.send({ msg: e.message });
  }
});

router.post('/log-in', async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email }, (err, user) => {
    if (err) {
      console.log('Failed to Login because: ', err)
      res.send({ msg: 'Failed to Login'})
    }
    if (user && user.password === password) {
      const logInUser = await User.findOne({
        email,
        password,
      });

      if (logInUser) {
        const { _id: id, name, email, isAdmin } = logInUser;
        res.send({
          id,
          name,
          email,
          isAdmin,
          token: getToken(logInUser)
        })
      } else {
        res.status(401).send({ msg: 'Invalid Email or Password' })
      }
    }
  })
  // Keep the code below
  // const logInUser = await User.findOne({
  //   email,
  //   password,
  // });

  // if (logInUser) {
  //   const { _id: id, name, email, isAdmin } = logInUser;
  //   res.send({
  //     id,
  //     name,
  //     email,
  //     isAdmin,
  //     token: getToken(logInUser)
  //   })
  // } else {
  //   res.status(401).send({ msg: 'Invalid Email or Password' })
  // }
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  const newUser = await user.save();
  if (newUser) {
    const { _id: id, name, email, isAdmin } = newUser;
    res.send({
      id,
      name,
      email,
      isAdmin,
      token: getToken(newUser)
    });
  } else {
    res.status(401).send({ msg: 'Invalid User.' })
  }
});

export default router;