import TextField from '@mui/material/TextField';
import './sell.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState,useEffect } from 'react';

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
    return(
        <div className='sell-main'>
            <h3>Employee-Dashboard</h3>
            <div className='sell-input'>
            <TextField fullWidth label="Search by name to add item to sell cart" id="fullWidth" onChange={(e)=>setserch(e.target.value)}/>
            </div>
           <div className="sell-card-main">
               {
                search.trim() !== "" ?
                filteredproduct.map((item)=>(
                    <div className="sell-card">
                    <div className="sell-card-img"><img src={item.image} alt='product-image'/></div>
                    <div className="sell-card-info">
                        <p className="sell-text-title">{item.name} </p>
                        <p className="sell-text-body">Brand: <i>{item.brand}</i></p>
                        <p className="sell-text-body">Stock: {item.stock}</p>
                    </div>
                    <div className="sell-card-footer">
                    <span className="sell-text-title">₹{item.price}</span>
                    <div className="sell-card-button">
                    ADD <AddShoppingCartIcon/>
                    </div>
                    </div>
                </div>
                )) :""
               }
            </div>
        </div>
    )
}