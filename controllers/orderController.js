// controllers/orderController.js
const db = require('../config/db');


exports.createOrder = async (req, res) => {
  const items = req.body.items; // [{ itemId, quantity }]
  const total = req.body.total;

  try {
    // Step 1: Insert the order into the database
    await db.query('INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)', [req.user.id, JSON.stringify(items), total]);

    // Step 2: Return success response after the order is inserted
    res.status(200).json({ message: 'Order placed successfully' });

  } catch (err) {
    console.error('Error:', err.message);
    // Handle error (either in DB insertion)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


