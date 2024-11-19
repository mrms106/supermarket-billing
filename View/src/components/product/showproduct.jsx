import { useEffect, useState } from "react"
import './product.css'
import { useNavigate } from "react-router-dom"

export default function Showproduct(){
    const [products,setproducts]=useState([])
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
    },[products])

    const deleteproduct=async(productId)=>{
        const responce=await fetch(`http://localhost:8080/api/deleteproduct/${productId}`,{
            method:"DELETE"
        })
       if(!responce.ok){
        alert("problem in delete the product")
       }
       alert("product deleted successfully")
    }

    return(
        <div className="product-card">
            {
                products.map((item)=>(
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
    )
}