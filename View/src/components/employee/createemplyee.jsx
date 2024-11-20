import { useState } from 'react'
import '../user/login.css'
export default function AddEmployee(){
    const [loginform,setloginform]=useState({
        name:"",
        empId:"",
    })
   const onInputChange=(e)=>{
     setloginform({...loginform,[e.target.name]:e.target.value})
   }
   const onformsubmit=async(e)=>{
    
    e.preventDefault()
    const responce=await fetch("http://localhost:8080/api/employee/signup",{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(loginform)
    })
    const data=await responce.json()
    if(!responce.ok){
        alert(`${data.error}`)
        return;
    }
    alert("you are registraion successfull")
   }
    return(
        <>
        <div className="loginform">
            <h2>Add New Cashier</h2>
            <form onChange={onInputChange} onSubmit={onformsubmit}>
               <input placeholder="enter employee name" name="name" type="name" required/>
                <input placeholder="employeeId" name="empId" type="name" required/>
                <button>Add Cashier</button>
            </form>
        </div>
        </>
    )
}