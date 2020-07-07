import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts } from '../actions/productActions';

const NewProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector(state => state.productSave)
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveProduct({
      name, price, image, brand, category, 
      countInStock, description
    }));
  }

  return (
    <>
      <div className='content content-margined'>
        <div className='product-header'>
          <h3>Products</h3>
          <button>Create Product</button>
        </div>

        <div className='form'>
          <form onSubmit={submitHandler}>
            <ul className='form-container'>
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={e => setName(e.target.value)} />
              </li>
              <li>
                <label htmlFor='price'>Price</label>
                <input
                  type='number'
                  name='price'
                  id='price'
                  value={price}
                  onChange={e => setPrice(e.target.value)} />
              </li>
              <li>
                <label htmlFor='image'>Image</label>
                <input
                  type='text'
                  name='image'
                  id='image'
                  value={image}
                  onChange={e => setImage(e.target.value)} />
              </li>
              <li>
                <label htmlFor='brand'>Brand</label>
                <input
                  type='text'
                  name='brand'
                  id='brand'
                  value={brand}
                  onChange={e => setBrand(e.target.value)} />
              </li>
              <li>
                <label htmlFor='category'>Category</label>
                <input
                  type='text'
                  name='category'
                  id='category'
                  value={category}
                  onChange={e => setCategory(e.target.value)} />
              </li>
              <li>
                <label htmlFor='countInStock'>Count-In-Stock</label>
                <input
                  type='number'
                  name='countInStock'
                  id='countInStock'
                  value={countInStock}
                  onChange={e => setCountInStock(e.target.value)} />
              </li>
              <li>
                <label htmlFor='description'>Description</label>
                <textarea
                  name='description'
                  id='description'
                  value={description}
                  onChange={e => setDescription(e.target.value)} />
              </li>
              <li>
                <button
                  type='submit'
                  className='button primary full-width'>Create</button>
              </li>
            </ul>
          </form>
        </div>

        <div className='product-list'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
              <tr>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.action}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default NewProductScreen;