import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import logo from './components/Images/logo.jpg'
import EmployeeList from './components/EmployeeLIst';
import EditEmployee from './components/Editemployee';
// import bgvideo from './video/bgvideo.mp4'
import './App.css'

function App(){
  return (
    <>
    {/* <video autoplay loop muted className='background-video'>
      <source src={bgvideo} type='video/mp4'/>
    </video> */}
    <img className='img-logo' src={logo} alt="Logo" />
    <div className='app-container'>
    
      <BrowserRouter>
      <Routes>
        <Route exact path="/login"  element={<Login/>}/>
        <Route exact path="/"  element={<Home/>}/>
        <Route exact path="/register" element={<Register/>} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/edit-employee/:id" element={<EditEmployee/>} />
      </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
