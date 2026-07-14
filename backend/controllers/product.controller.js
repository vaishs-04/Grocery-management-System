import Product from "../models/product.model.js";
// add product :/api/product/add-product
export const addProduct = async (req, res) => {
  try {
    const { name, price, offerPrice, description, category } = req.body;

    // 1. Get filenames from Multer (req.files)
    // We name this 'image' to match your Schema and logic
    const image = req.files ? req.files.map((file) => file.filename) : [];

    // 2. Strict Validation
    if (
      !name ||
      !price ||
      !offerPrice ||
      !description ||
      !category ||
      image.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including images are required",
      });
    }

    // 3. Save to Database
    // Note: We use 'image: image' because that's the variable we defined above
    const product = await Product.create({
      name,
      price: Number(price),
      offerPrice: Number(offerPrice),
      description,
      category,
      image: image, // Use the 'image' array, NOT 'imageUrl'
    });

    return res.status(201).json({ 
      success: true, 
      message: "Product added successfully", 
      product 
    });

  } catch (error) {
    console.error("Detailed Error in addProduct:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error while adding product",
      error: error.message 
    });
  }
};

// get products :/api/product/get
// get products :/api/product/get
export const getProducts = async (req, res) => {
  try {
    // Let MongoDB do the sorting directly
    const products = await Product.find({}).sort({ createdAt: -1 }); 
    
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error in getProducts:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// get single product :/api/product/id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if(!product) {
      return res
        .status(404)
        .json({message: "prodcut not found", success : false});
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// change stock  :/api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, product, message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};