import express from 'express';
import Product from '../models/productModel';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.post('/', async (req, res) => {
  const { name, price, image, brand, category, 
        countInStock, description } = req.body;

  const product = new Product({ 
    name, price, image, brand, category, 
    countInStock, description });

  const newProduct = await product.save();

  if (newProduct) {
    return res.status(201).send({ message: 'New Product Created', data: newProduct })
  }
  return res.status(500).send({ message: 'Error in Creating New Product.' })
});

export default router;