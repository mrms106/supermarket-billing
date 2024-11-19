const products=require("../modules/products")

module.exports.products=async(req,res)=>{
    try{
        const allproducts=await products.find({})
        res.status(200).json({message:"data fetched success",products:allproducts})
    }catch(err){
        console.log(err)
    }
}
module.exports.addproduct = async (req, res) => {
    const product = req.body;
  
    // Validate required fields (example)
    if (!product.name || !product.price) {
      return res.status(400).json({ message: "Product name and price are required" });
    }
  
    try {
      const newProduct = new products(product);
      await newProduct.save();
      res.status(201).json({ message: "Product is added" });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: "Validation failed", errors: err.errors });
      }
      console.error(err);
      res.status(500).json({ message: "Something went wrong", error: err });
    }
  };

  module.exports.updateproduct = async (req, res) => {
    const productId=req.params.id
    const product = req.body;
  
    // Validate required fields (example)
    if (!product.name || !product.price) {
      return res.status(400).json({ message: "Product name and price are required" });
    }
  
    try {
      const updatedProduct = await products.findByIdAndUpdate(productId,product);
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(201).json({ message: "Product is updated" });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: "Validation failed", errors: err.errors });
      }
      console.error(err);
      res.status(500).json({ message: "Something went wrong", error: err });
    }
  };

  module.exports.deleteproduct = async (req, res) => {
    const productId = req.params.id; // Extract the `id` from `req.params`
  
    try {
      // Ensure `productId` is valid
      if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
  
      // Find and delete the product
      const deletedProduct = await products.findByIdAndDelete(productId);
  
      // If product not found
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong", error: err });
    }
  };