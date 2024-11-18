import { useState } from 'react'
import Navbar from './components/include/navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/user/login';
import Signup from './components/user/signup';
import Startscreen from './components/user/startsreen';

function App() {


  return (
    <>
   <Router>
    <Navbar/>
    <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/start' element={<Startscreen/>} />
    </Routes>
   </Router>
    </>
  )
}

export default App
