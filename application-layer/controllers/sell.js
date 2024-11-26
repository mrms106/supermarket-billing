const Cart=require("../modules/sell")
const products=require("../modules/products")
module.exports.Sell = async (req, res) => {
  const { customerName, cartProducts, totalPrice } = req.body;
  try {
    
    // Create a new Cart document
    const newCart = new Cart({
      customerName,
      cartProducts, // Array of products with name, price, stock, totalPrice
      totalPrice,   // Total price of all cart products
      date: new Date(), // Use IST-compliant date
    });

    // Save the cart data to the database
    const savedCart = await newCart.save();
    res.status(200).json({
      message: 'Bill generated successfully',
      cart: savedCart,
    });
  } catch (error) {
    console.error('Error saving cart:', error);
    res.status(500).json({
      message: 'Error generating bill',
      error: error.message,
    });
  }
};


module.exports.updateStocks = async (req, res) => {
    const { stockUpdates } = req.body; // Array of product updates
  
    try {
      for (let update of stockUpdates) {
        const { productId, quantity } = update;
  
        // Find the product and update its stock
        const product = await products.findById(productId);
        if (product) {
          product.stock -= quantity; // Subtract the quantity from stock
          if (product.stock < 0) {
            return res.status(400).json({ message: `Not enough stock for product: ${product.name}` });
          }
  
          // If the product is in the cart, remove it
          if (product.incart) {
            product.incart = false; // Remove the product from the cart
          }
  
          await product.save(); // Save the updated product
        } else {
          return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }
      }
  
      res.status(200).json({ message: 'Stock updated and products removed from cart successfully' });
    } catch (error) {
      console.error('Error updating stock:', error);
      res.status(500).json({
        message: 'Error updating stock',
        error: error.message,
      });
    }
  };
  
module.exports.allsales=async(req,res)=>{
  try{
    const sells=await Cart.find({})
    res.status(200).send({sells:sells})
  }catch(err){
    console.log(err)
  }
}

module.exports.todaySales = async (req, res) => {
  try {
    const todayDate = new Date();
    const todayString = todayDate.toDateString(); // Extracts only the date portion in string format, e.g., "Tue Nov 25 2024"

    // Query for today's sales based on the string match
    const sells = await Cart.find({
      date: { $regex: `^${todayString}` } // Matches the start of the date string
    });

    res.status(200).send({ sells });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
};