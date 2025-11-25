// In-memory data store (replace with database in production)
let users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', age: 35 },
];

let nextId = 4;

// Get all users
const getAllUsers = (req, res) => {
  try {
    res.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get user by ID
const getUserById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Create a new user
const createUser = (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    // Check if email already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const newUser = {
      id: nextId++,
      name,
      email,
      age: age || null,
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update a user
const updateUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, age } = req.body;

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update user
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (age !== undefined) users[userIndex].age = age;

    res.json({
      success: true,
      data: users[userIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete a user
const deleteUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    users.splice(userIndex, 1);

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

