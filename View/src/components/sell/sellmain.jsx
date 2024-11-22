import TextField from '@mui/material/TextField';
import './sell.css'
import { useState,useEffect } from 'react';
import Sellcard from './sellcard';

export default function Sellmain(){

    const [products,setproducts]=useState([])
    const [search,setserch]=useState("")
    const fetchproducts=async()=>{
        const responce=await fetch("http://localhost:8080/api/product")
        if(!responce.ok){
            alert("something went wrong to show data")
        }
        const data=await responce.json()
        setproducts(data.products)
    }
    useEffect(() => {
        if (search.trim() !== "") { 
          fetchproducts();
        }
      }, [search]);

    const filteredproduct= products.filter((item)=>
        item.name.toLowerCase().includes(search.toLowerCase())
       )
    const addRemoveCart=async(Id)=>{
        const responce=await fetch(`http://localhost:8080/api/addremovecart/${Id}`,{
            method:"PATCH",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(!responce.ok){
            alert("problem in add product in cart..")
            return
        }
        const data=await responce.json()
        alert(data.message)
        fetchproducts()
    }
    return(
        <div className='sell-main'>
            <h3>Employee-Dashboard</h3>
            <div className='sell-input'>
            <TextField fullWidth label="Search by name to add item to sell cart" id="fullWidth" onChange={(e)=>setserch(e.target.value)}/>
            </div>
            <Sellcard search={search} filteredproduct={filteredproduct} addRemoveCart={addRemoveCart} />
        </div>
    )
}