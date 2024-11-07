// controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ status: "ERROR", message: 'Database error', statusCode: 500  });
    if (!results.length || !(await bcrypt.compare(password, results[0].password))) {
      return res.status(400).json({ status: "ERROR", message: 'Invalid credentials', statusCode: 400 });
    }

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ status: "SUCCESS", message: 'Logged in successfully', statusCode: 200, token });
  });
};
