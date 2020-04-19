import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom'
import Home from './Components/Home.js'
import './App.css';

function App() {
  return (
    <HashRouter>
        <header className='header'>
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/portfolio">Portfolio</Link>
        </header>
        <Route exact path="/" component={Home} />
    </HashRouter>
  );
}

export default App;
