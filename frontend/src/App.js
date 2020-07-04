import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';

const App = () => {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open")
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
          </button>
            <Link to='/'>imma-zone</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            <a href="login.html">Log in</a>
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>X</button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route exact path='/' component={HomeScreen}></Route>
            <Route path='/products/:id' component={ProductScreen}></Route>
          </div>
        </main>
        <footer className="footer">
          All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App;