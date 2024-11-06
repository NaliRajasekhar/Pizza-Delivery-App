// controllers/userController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

exports.signup = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, email, password, address } = value;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (name, email, password, address) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, address],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'User created successfully' });
    }
  );
};


// Update User Information
// controllers/userController.js

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, streetAddress } = req.body;

  try {
    const query = 'UPDATE users SET name = ?, email = ?, street_address = ? WHERE id = ?';
    const [result] = await db.execute(query, [name, email, streetAddress, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the user from the database
        const query = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


