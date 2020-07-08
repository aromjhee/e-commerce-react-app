import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

import config from './config.js';
import { data } from './products.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch(error => console.log(error.reason));

const app = express();
const __dirname = path.resolve();

app.use(bodyParser.json());
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../frontend/build/index.html'));
})
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// app.get('/api/products/:id', (req, res) => {
//   const productId = req.params.id;
//   const product = data.products.find(x => x.id === Number.parseInt(productId));
//   if (product) res.send(product);
//   else res.send(404).send({ msg: 'Product Not Found.' });
// });

// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });

const port = config.PORT;
app.listen(port, () => console.log(`listening to port ${port}...`))