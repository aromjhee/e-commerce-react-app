import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

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

router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  const logInUser = await User.findOne({
    email,
    password,
  });

  if (logInUser) {
    const { id, name, email, isAdmin } = logInUser;
    res.send({
      id,
      name,
      email,
      isAdmin,
      token: getToken(user)
    })
  } else {
    res.status(401).send({ msg: 'Invalid Email or Password' })
  }
});

export default router;