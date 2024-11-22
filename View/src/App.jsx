import { useEffect, useState } from 'react'
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
import EmpLogin from './components/user/emplogin';
import Sellmain from './components/sell/sellmain';
import IsOwner from './owner';
function App() {

  
let[isownerlogin,setisownerlogin]=useState(null)
    const fetchuser=async()=>{
        try{
        const responce=await fetch("http://localhost:8080/api/user",{
            credentials:"include"
        })
        if(!responce.ok){
            console.log("Something went wrong");
            setisownerlogin(false);
                return; 
        }
        const data= await responce.json()
        
        setisloggedIn(true)
    }catch(err){
        console.log(err)
        setisownerlogin(false)
    }
  }
console.log(isownerlogin)
    useEffect(()=>{
        fetchuser()
    },[])
if(isownerlogin===null){
    return <p>LOading</p>
}

  return (
    <>
   <Router>
    <Navbar/>
    <Routes>

        <Route path='/' element={<Startscreen/>} />
        
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route element={<IsOwner isownerlogin={isownerlogin}/>} >
          <Route path='/dashboard' element={<PanelMain/>} />
          <Route path='/allproducts' element={<Showproduct/>} />
          <Route path='/updateproduct/:id' element={<UpdateProduct/>} />
          <Route path='/addproduct' element={<Addproduct/>} />
          <Route path='/addemployee' element={<AddEmployee/>} />
          <Route path='/showemployee' element={<Showemployee/>} />
          </Route>
          <Route path='/Emplogin' element={<EmpLogin/>} />
          <Route path='/sell' element={<Sellmain/>} />
    </Routes>
   </Router>
    </>
  )
}

export default App
