const User = require('../Models/UserModel');

// Handler to register a new user
const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Ensure all required fields are provided
      if (!username || !email || !password) {
        return res.status(400).send({ error: 'All fields (username, email, password) are required.' });
      }
  
      // Create a new user instance
      const user = new User({ username, email, password });
  
      // Save the user to the database
      await user.save();
  
      // Generate a JWT token
      const token = user.generateAuthToken();
  
      // Respond with the newly created user and token
      res.status(201).send({ user, token });
    } catch (error) {
      console.error('Error registering user:', error);
  
      if (error.name === 'ValidationError') {
        // Extract validation errors
        const validationErrors = Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = {
            message: error.errors[key].message,
            kind: error.errors[key].kind
          };
          return acc;
        }, {});
  
        return res.status(400).send({ error: 'Validation failed', details: validationErrors });
      }
  
      // Handle other types of errors
      res.status(500).send({ error: 'Internal server error' });
    }
  };
  
  

// Handler to log in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    // Send a response with user ID and token (excluding sensitive info)
    res.status(200).send({ userId: user._id, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};




// Handler to get users or a specific user by ID
const getUser = async (req, res) => {
  try {
    if (req.params.id) {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send(user);
    } else {
      const users = await User.find();
      res.status(200).send(users);
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser, getUser };
