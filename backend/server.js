import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config';
import { data } from './products';
import userRoutes from './routes/userRoutes';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json())
app.use('/api/users', userRoutes);

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(x => x.id === Number.parseInt(productId));
  if (product) res.send(product);
  else res.send(404).send({ msg: 'Product Not Found.' });
});

app.get('/api/products', (req, res) => {
  res.send(data.products);
});


app.listen(8080, () => console.log('listening to port 8080...'))