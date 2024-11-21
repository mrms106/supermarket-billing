import { useState } from 'react'
import Navbar from './components/include/navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/user/login';
import Signup from './components/user/signup';
import Startscreen from './components/user/startsreen';
import PanelMain from './components/panel/panelmain';
import Showproduct from './components/product/showproduct';
import UpdateProduct from './components/product/updateproduct';
import Addproduct from './components/product/addproduct';
import AddEmployee from './components/employee/createemplyee';
import Showemployee from './components/employee/showemployee';
function App() {


  return (
    <>
   <Router>
    <Navbar/>
    <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/start' element={<Startscreen/>} />
          <Route path='/dashboard' element={<PanelMain/>} />
          <Route path='/allproducts' element={<Showproduct/>} />
          <Route path='/updateproduct/:id' element={<UpdateProduct/>} />
          <Route path='/addproduct' element={<Addproduct/>} />
          <Route path='/addemployee' element={<AddEmployee/>} />
          <Route path='/showemployee' element={<Showemployee/>} />
    </Routes>
   </Router>
    </>
  )
}

export default App
