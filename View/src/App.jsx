import { useState } from 'react'
import Navbar from './components/include/navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/user/login';

function App() {


  return (
    <>
   <Router>
    <Navbar/>
    <Routes>
          <Route path='/login' element={<Login/>} />
    </Routes>
   </Router>
    </>
  )
}

export default App
