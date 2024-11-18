import { useState } from 'react'
import './login.css'

export default function Signup(){
    const [loginform,setloginform]=useState({
        name:"",
        email:"",
        password:""
    })
   const onInputChange=(e)=>{
     setloginform({...loginform,[e.target.name]:e.target.value})
   }
   const onformsubmit=async(e)=>{
    
    e.preventDefault()
    const responce=await fetch("http://localhost:8080/api/signup",{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(loginform)
    })
    if(!responce.ok){
        alert("problem in registraion ")
    }
    alert("you are registraion successfull")
   }
    return(
        <>
        <div className="loginform">
            <h2>Signup As Admin</h2>
            <form onChange={onInputChange} onSubmit={onformsubmit}>
               <input placeholder="enter your name" name="name" type="name" required/>
                <input placeholder="email" name="email" type="email" required/>
                <input placeholder="enter password" name="password" type="password" required/>
                <button>Signup</button>
            </form>
        </div>
        </>
    )
}