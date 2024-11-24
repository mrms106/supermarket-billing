const mongoose = require('mongoose');
const Product = require('../modules/products'); // Adjust path to the correct file where Product schema is defined
const products = require('./data'); // Ensure this contains the array of product data

const MONGODB_URI = "mongodb://127.0.0.1:27017/supermarket"; // Replace with your actual MongoDB URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    
    // Insert the products data
   
    return Product.insertMany(products);
  })
  .then((insertedProducts) => {
    console.log(`Inserted ${insertedProducts.length} products successfully.`);
    mongoose.connection.close(); // Close connection after insertion
  })
  .catch((error) => {
    console.error("Error inserting products:", error);
    mongoose.connection.close(); // Ensure connection is closed on error as well
  });
