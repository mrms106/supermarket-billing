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
    // Filter the products with `stock` and prepare cart details
    const billDetails = products
      .filter((item) => item.incart && (stock[item._id] || 0) > 0)
      .map((item) => ({
        name: item.name,
        brand: item.brand,
        price: item.price,
        stock: stock[item._id], // Entered stock/quantity
        totalPrice: item.price * (stock[item._id] || 0),
      }));

    // Prepare payload
    const payload = {
      customerName: name,
      cartProducts: billDetails,
      totalPrice: calculateTotalPrice(),
    };

    setCartDetails(payload); // Update local state (for debugging/display purposes)
   console.log(cartDetails)
    // Send to server
    fetch("http://localhost:8080/api/generateBill", {
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
        alert("Bill generated successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
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
