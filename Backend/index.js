const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3000;
const router = require('./routes/routes'); // Adjust the path if necessary
const connectdb = require('./config'); // Adjust the path if necessary

// Enable CORS for all origins or a specific origin
app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from this specific frontend origin
}));

app.use(express.json());
app.use('/api/v1', router); // Use the router for API versioning

connectdb(); // Connect to the database

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
