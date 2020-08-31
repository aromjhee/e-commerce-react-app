import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import config from './config.js';
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

app.use(bodyParser.json());

let url;
if (process.env.NODE_ENV === 'development') {
  url = process.env.LOCAL_URL
} else {
  url = process.env.PROD_URL
}

app.use(cors({ origin: url }));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const port = config.PORT;
app.listen(port, () => console.log(`listening to port ${port}...`))