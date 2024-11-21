import { useEffect, useState } from 'react'
import './employee.css'

export default function Showemployee(){
   const[employees,setemployees]=useState([])
   
   const fetchEmployees=async()=>{
      const responce=await fetch("http://localhost:8080/api/employee/employeedata")

      if (!responce.ok){
        alert("problem in fetch employees")
        return;
      }
      const data=await responce.json()
      setemployees(data.employees)
   }

   useEffect(()=>{
    fetchEmployees()
   },[])

    return(
        <div className='employee-main'>
            <h2>Employee List</h2>
           {
            employees.map((emp)=>(
                <div className="employee-card">
                <div className="info">
                   <div className="empname">Emplayee Name: {emp.name} </div>
                   <div className="empId">Employee Id: {emp.empId}</div>
                </div>
                <div className="line"></div>
                <div className="button">
                   <span>remove employee</span>
                </div>
                
           </div>
            ))
           }
        </div>
    )
}