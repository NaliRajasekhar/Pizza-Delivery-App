// controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Using promise-based query with mysql2
    const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
      return res.status(400).json({ status: "ERROR", message: 'Invalid credentials', statusCode: 400 });
    }

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ status: "SUCCESS", message: 'Logged in successfully', statusCode: 200, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "ERROR", message: 'Database error', statusCode: 500 });
  }
};
