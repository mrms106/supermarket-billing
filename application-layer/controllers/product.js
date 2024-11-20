const products=require("../modules/products")

module.exports.products=async(req,res)=>{
  console.log(req.user)
    try{
        const allproducts=await products.find({})
        res.status(200).json({message:"data fetched success",products:allproducts})
    }catch(err){
        console.log(err)
    }
}
module.exports.addproduct = async (req, res) => {
  const { name, price, stock, brand, category, image } = req.body;
  console.log( name, price, stock, brand, category, image)

  if (!name || !price || !stock || !brand || !category || !image) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newProduct = new products({ name, price, stock, brand, category, image });
    console.log(newProduct)
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully." });
  } catch (err) {
    if (err.name === "ValidationError") {
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

  module.exports.getproduct=async(req,res)=>{
    const productId=req.params.id
    try{
      const product=await products.findById(productId)
      res.status(200).json({message:"product fetched success",product:product})
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    }catch(err){
      console.log(err)
      res.status(400).json({message:"something went wrong",err:err})
    }
  }