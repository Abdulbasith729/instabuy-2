const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
      this.password = await bcrypt.hash(this.password, salt); // Hash the password
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next(); // Skip hashing if password hasn't changed
  }
});

// Compare provided password with hashed password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate a JWT token
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, username: this.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = mongoose.model('User', userSchema);
