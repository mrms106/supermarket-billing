import { useParams } from 'react-router-dom'
import '../user/login.css'
import { useEffect, useState } from 'react'
export default function UpdateProduct(){
  const { id: productId } = useParams();
  const[product,setproduct]=useState({})

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
  
    return(
         <>
         <div className='update-heading'><h2>Update Product</h2></div>
       
          <div className='loginform'>
            <form >
                <input type="name" name="name" ></input>
                <div>
                <input type="number" name="price" ></input>
                <input type="number" name="stock" ></input>
                </div>
                <div>
                <input type="brand" name="brand" ></input>
                <input type="catagory" name="catagory" ></input>
                </div>
                <button>Update Product</button>
            </form>
          </div>
         </>
    )
}