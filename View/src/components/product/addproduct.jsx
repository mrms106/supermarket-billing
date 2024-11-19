import { useNavigate } from 'react-router-dom';
import '../user/login.css';
import { useState } from 'react';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
    image: "",
  });
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!product.name || !product.price || !product.category || !product.brand || !product.image || !product.stock) {
      alert("Please fill all fields before submitting.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/addproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
        credentials: "include",
      });

      if (response.ok) {
        alert("Product added successfully!");
        navigate("/allproducts");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="update-heading">
        <h2>Add Product</h2>
      </div>

      <div className="loginform">
        <form onSubmit={onFormSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={onInputChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Enter product image link"
              value={product.image}
              onChange={onInputChange}
            />
          </div>
          <div>
            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              value={product.price}
              onChange={onInputChange}
            />
            <input
              type="number"
              name="stock"
              placeholder="Enter product stock"
              value={product.stock}
              onChange={onInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="brand"
              placeholder="Enter product brand"
              value={product.brand}
              onChange={onInputChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Enter product category"
              value={product.category}
              onChange={onInputChange}
            />
          </div>
          <button>Add Product</button>
        </form>
      </div>
    </>
  );
}
