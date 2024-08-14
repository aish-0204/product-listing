// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data with different product names and descriptions
const products = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, description: 'High-quality wireless headphones with noise-cancellation.', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Smartwatch Pro', price: 199.99, description: 'Advanced smartwatch with health tracking and GPS.', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Gaming Keyboard', price: 89.99, description: 'Mechanical gaming keyboard with RGB lighting.', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: '4K Monitor', price: 299.99, description: 'Ultra HD 4K monitor with stunning color accuracy.', imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Portable Speaker', price: 49.99, description: 'Compact portable speaker with deep bass and clear sound.', imageUrl: 'https://via.placeholder.com/150' },
];

// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
