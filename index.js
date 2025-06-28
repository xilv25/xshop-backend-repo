const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration (Allow all for development)
app.use(cors());

// Import Routes
const templateRoutes = require('./routes/templates');

// Define Routes
app.use('/api/templates', templateRoutes);

// Basic test route
app.get('/', (req, res) => {
    res.send('Welcome to Xshop Backend API!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Xshop Backend running on port ${PORT}`);
    console.log(`Access at http://localhost:${PORT} (internal)`);
});
