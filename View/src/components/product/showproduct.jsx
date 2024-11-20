import { useEffect, useState } from "react"
import './product.css'
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';

export default function Showproduct(){
    const [products,setproducts]=useState([])
    const [option,setoption]=useState("")
    const navigate= useNavigate()
    const fetchproducts=async()=>{
        const responce=await fetch("http://localhost:8080/api/product")
        if(!responce.ok){
            alert("something went wrong to show data")
        }
        const data=await responce.json()
        setproducts(data.products)
    }
    useEffect(()=>{
        fetchproducts()
    },[])
console.log(option)
    const deleteproduct=async(productId)=>{
        const responce=await fetch(`http://localhost:8080/api/deleteproduct/${productId}`,{
            method:"DELETE"
        })
       if(!responce.ok){
        alert("problem in delete the product")
       }
       alert("product deleted successfully")
       fetchproducts()
    }
    const catagoryoption=(e)=>{
       setoption(e.target.value)
    }
     const filteredproduct= products.filter((item)=>
     item.category.toLowerCase().includes(option.toLowerCase()) ||
     item.name.toLowerCase().includes(option.toLowerCase()) ||
     item.brand.toLowerCase().includes(option.toLowerCase())
    )
    return(
        <>
        <div className="product-header">
            <div className="product-1stbox goback" onClick={()=>navigate("/dashboard")}> <ArrowBackIosNewSharpIcon/> Go to dashboard</div>
            <div className="product-1stbox ">
                <div className="search">
                <TextField id="outlined-basic" label="Search-products" variant="outlined" onChange={catagoryoption} />
                </div>
                <div>
                <select id="options" onChange={catagoryoption}>
                    <option value="">Select category</option>
                    {[...new Set(products.map((item) => item.category))].map((uniqueCategory) => (
                        <option key={uniqueCategory} value={uniqueCategory}>
                        {uniqueCategory}
                        </option>
                    ))}
                </select>
             </div>
            </div>
        </div>
        <div className="product-card">
            {
                filteredproduct.map((item)=>(
                    <div className="card maincard" style={{width: "18rem"}}  >
                    <img src={item.image} className="card-img-top" alt="product Image"/>
                    <div className="card-body">
                      <p>Name: <b className="card-title">{item.name}</b></p>
                     
                   <p>
                   <span className="card-text">Stock: {item.stock}</span> &nbsp; &nbsp;
                   <span className="card-text">price: ₹{item.price}</span><br></br>
                   <span className="card-text">category: {item.category}</span>
                   </p>
                      <p>
                     
                      <button className="btn btn-primary" onClick={()=>navigate(`/updateproduct/${item._id}`)}>update  </button>
                      <button className="btn btn-secondary" onClick={()=>deleteproduct(item._id)}>remove  </button>

                     
                      </p>
                      
                    </div>
                  </div>
                ))
            }

        </div>
        </>
    )
}