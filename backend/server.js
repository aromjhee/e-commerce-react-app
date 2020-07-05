import express from 'express';

import { data } from './products';

const app = express();

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