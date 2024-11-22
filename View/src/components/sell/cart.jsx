import { useState } from "react";

export default function Cart({ products }) {
  // State to store stock for each product
  const [stock, setStock] = useState({});
  const [name, setName] = useState(""); // Customer name
  const [cartDetails, setCartDetails] = useState([]); // To store cart details

  // Function to handle stock input for a specific product
  const handleStockChange = (productId, value) => {
    setStock((prevStock) => ({
      ...prevStock,
      [productId]: parseInt(value) || 0,
    }));
  };

  // Function to calculate the total price of all products
  const calculateTotalPrice = () => {
    return products.reduce((total, item) => {
      const quantity = stock[item._id] || 0;
      return total + item.price * quantity;
    }, 0);
  };

  // Function to handle "Generate Bill"
  const handleGenerateBill = () => {
    // Filter and map the products that are in the cart with entered stock
    const billDetails = products
      .filter((item) => item.incart && (stock[item._id] || 0) > 0)
      .map((item) => ({
        name: item.name,
        brand: item.brand,
        price: item.price,
        stock: stock[item._id], // Entered stock/quantity
        totalPrice: item.price * (stock[item._id] || 0),
      }));
  
    // Prepare payload to send for generating the bill
    const payload = {
      customerName: name,
      cartProducts: billDetails,
      totalPrice: calculateTotalPrice(),
    };
  
    // Prepare stock update payload
    const stockUpdates = products
      .filter((item) => item.incart && (stock[item._id] || 0) > 0)
      .map((item) => ({
        productId: item._id,
        quantity: stock[item._id], // Subtracted quantity
      }));
  
    // Send the data to the server
    fetch("http://localhost:8080/api/sell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to generate bill");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Bill Generated Successfully:", data);
  
        // Send stock update request after generating bill
        fetch("http://localhost:8080/api/updateStock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stockUpdates }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update stock");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Stock updated successfully:", data);
            alert("Bill generated and stock updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating stock:", error);
            alert("Error updating stock");
          });
      })
      .catch((error) => {
        console.error("Error generating bill:", error);
        alert("Error generating bill");
      });
  };
  

  return (
    <>
      <div className="cart-main">
        <h3>Added Products</h3>
        <div className="seller-details">
          <label>Enter customer Name</label>
          <input
            placeholder="Enter name"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Enter Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              (item) =>
                item.incart && (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <input
                        type="number"
                        placeholder="Enter stock"
                        min="0"
                        onChange={(e) =>
                          handleStockChange(item._id, e.target.value)
                        }
                      />
                    </td>
                    <td>₹{(stock[item._id] || 0) * item.price}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        <div className="cart-total">
          <h4>Total Price: ₹{calculateTotalPrice()}</h4>
          <div className="cart-button" onClick={handleGenerateBill}>
            Generate Bill
          </div>
        </div>
      </div>
    </>
  );
}
