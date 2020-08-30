import express from 'express';

import Product from '../models/productModel.js';

import { isAuth, isAdmin } from '../util.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { 
    const products = await Product.find({});
    res.send(products);
  } catch(e) {
    console.log(e)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found.' });
    }
  } catch(e) {
    console.log(e)
  }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  const { name, price, image, brand, category, 
        countInStock, description } = req.body;

  try {
    const product = new Product({ 
      name, price, image, brand, category, 
      countInStock, description });

    const newProduct = await product.save();

    if (newProduct) {
      return res.status(201).send({ message: 'New Product Created', data: newProduct })
    }
    return res.status(500).send({ message: 'Error in Creating New Product.' })
  } catch(e) {
    console.log(e)
  }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  try {  
    const productId = req.params.id;
    let product = await Product.findById(productId);

    if (product) {
      const { name, price, image, brand, category,
        countInStock, description } = req.body;
        
      product.name = name;
      product.price = price;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.description = description;

      const updatedProduct = await product.save();

      if (updatedProduct) {
        return res.status(200).send({ message: `Updated Product ${name}`, data: updatedProduct })
      }
    }
    return res.status(500).send({ message: 'Error in Updating Product.' })
  } catch(e) {
    console.log(e)
  }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.send({ message: 'Error in Deleting Product.' })
    }
  } catch(e) {
    console.log(e)
  }
})

export default router;