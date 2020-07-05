import express from 'express';

import { data } from './products';

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.listen(8080, () => console.log('listening to port 8080...'))