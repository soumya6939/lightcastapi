// In-memory data store (replace with database in production)
let products = [
  {
    id: 1,
    name: 'Laptop',
    price: 999.99,
    description: 'High-performance laptop',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Smartphone',
    price: 699.99,
    description: 'Latest model smartphone',
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Headphones',
    price: 149.99,
    description: 'Wireless noise-cancelling headphones',
    category: 'Electronics',
  },
  {
    id: 4,
    name: 'Desk Chair',
    price: 299.99,
    description: 'Ergonomic office chair',
    category: 'Furniture',
  },
];

let nextId = 5;

// Get all products
const getAllProducts = (req, res) => {
  try {
    let filteredProducts = [...products];

    // Filter by category
    if (req.query.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.toLowerCase() === req.query.category.toLowerCase()
      );
    }

    // Filter by price range
    if (req.query.minPrice) {
      const minPrice = parseFloat(req.query.minPrice);
      filteredProducts = filteredProducts.filter((p) => p.price >= minPrice);
    }

    if (req.query.maxPrice) {
      const maxPrice = parseFloat(req.query.maxPrice);
      filteredProducts = filteredProducts.filter((p) => p.price <= maxPrice);
    }

    res.json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get product by ID
const getProductById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Create a new product
const createProduct = (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    // Validation
    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required',
      });
    }

    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a positive number',
      });
    }

    const newProduct = {
      id: nextId++,
      name,
      price: parseFloat(price),
      description: description || '',
      category: category || 'Uncategorized',
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update a product
const updateProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price, description, category } = req.body;

    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Update product
    if (name) products[productIndex].name = name;
    if (price !== undefined) {
      if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({
          success: false,
          message: 'Price must be a positive number',
        });
      }
      products[productIndex].price = parseFloat(price);
    }
    if (description !== undefined) products[productIndex].description = description;
    if (category) products[productIndex].category = category;

    res.json({
      success: true,
      data: products[productIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete a product
const deleteProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    products.splice(productIndex, 1);

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

