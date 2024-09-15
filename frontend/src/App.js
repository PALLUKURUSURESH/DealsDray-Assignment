import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import logo from './components/Images/logo.jpg'
import './App.css'

function App(){
  return (
    <>
    <img className='img-logo' src={logo} alt="Logo" />
    <div className='app-container'>
    
      <BrowserRouter>
      <Routes>
        <Route exact path="/login"  element={<Login/>}/>
        <Route exact path="/"  element={<Home/>}/>
        <Route exact path="/register" element={<Register/>} />
      </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
