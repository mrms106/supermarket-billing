import { useNavigate, useParams } from 'react-router-dom'
import '../user/login.css'
import { useEffect, useState } from 'react'
export default function UpdateProduct(){
  const { id: productId } = useParams();
  const[product,setproduct]=useState({})
  const navigate=useNavigate()


  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/updateproduct/${productId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setproduct(data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Problem in fetching the product. Please check the console for details.");
    }
  };
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const oninputChange=(e)=>{
    setproduct({...product,[e.target.name]:e.target.value})
  }
  const onformsubmit= async(e)=>{
    e.preventDefault()
    const responce=await fetch(`http://localhost:8080/api/updateproduct/${productId}`,{
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(product),
      credentials:'include'
    })
    if(!responce.ok){
      alert("problem in update")
    }
    alert("product updated successfully..!")
    navigate("/allproducts")
  }
    return(
         <>
         <div className='update-heading'><h2>Update Product</h2></div>
       
          <div className='loginform'>
            <form onChange={oninputChange} onSubmit={onformsubmit}>
                <input type="name" name="name" value={product.name}></input>
                <div>
                <input type="number" name="price" value={product.price}></input>
                <input type="number" name="stock" value={product.stock} ></input>
                </div>
                <div>
                <input type="brand" name="brand" value={product.brand} ></input>
                <input type="catagory" name="catagory" value={product.category}></input>
                </div>
                <button>Update Product</button>
            </form>
          </div>
         </>
    )
}