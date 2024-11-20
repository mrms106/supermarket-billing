import { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'

export default function Login(){
    const navigate= useNavigate()
    const [loginform,setloginform]=useState({
        email:"",
        password:""
    })
   const onInputChange=(e)=>{
     setloginform({...loginform,[e.target.name]:e.target.value})
   }
   const onformsubmit=async(e)=>{
    e.preventDefault()
    const responce=await fetch("http://localhost:8080/api/login",{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(loginform)
    })
    if(!responce.ok){
        alert("you are login unsuccessfull")
        return;
    }
    alert("you are login successfull")
    navigate("/dashboard")

   }
    return(
        <>
        <div className="loginform">
            <h2>Login As Admin</h2>
            <form onChange={onInputChange} onSubmit={onformsubmit}>
                <input placeholder="email" name="email" type="email" required/>
                <input placeholder="enter password" name="password" type="password" required/>
                <button>Login</button>
            </form>
        </div>
        </>
    )
}