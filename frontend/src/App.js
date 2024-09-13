import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'

function App(){
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/login"  element={<Login/>}/>
        <Route exact path="/"  element={<Home/>}/>
        <Route exact path="/register" element={<Register/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
