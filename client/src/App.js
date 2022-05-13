import icon from './images/Vector.png';
import logo from './images/DIGITUTOR.png';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import React from 'react';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      
   
        <header className="App-header">
          <nav className="navLogo">
          <Link to='/'> 
            <img className="icon" src={icon} alt="Icon" />
            <img className="logo" src={logo} alt="Digitutor" />
          </Link> 
          <Link to='/login'>Login</Link>
         
          </nav>
        </header>
   
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
        </Routes>

      
    </div>
  );
}

export default App;

