// controllers/userController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const { createError } = require('../middleware/errorhandler');
const CONSTANTS = require('../constants');

exports.signup = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().required(),
  }, { abortEarly: false });

  // Validate the request body
  const { error, value } = schema.validate(req.body);
  if (error) {
    return next(createError(error.details[0].message, CONSTANTS.STATUS_CODES.BAD_REQUEST));
  }

  const { name, email, password, address } = value;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use mysql2's promise API for the query
    const [results] = await db.query(
      'INSERT INTO users (name, email, password, address) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, address]
    );

    res.status(201).json({
      status: "SUCCESS",
      message: 'User created successfully',
      statusCode: 201
    });

  } catch (err) {
    console.error('Error:', err);
    // Handle errors (whether it's database or hashing)
    return next(createError('Database error', CONSTANTS.STATUS_CODES.INTERNAL_ERROR));
  }
};


// Update User Information
// controllers/userController.js

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, address } = req.body;

  try {
    const query = 'UPDATE users SET name = ?, email = ?, address = ? WHERE id = ?';
    const result = await db.execute(query, [name, email, address, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: "ERROR", message: 'User not found' , statusCode: 404 });
    }
    res.status(200).json({ status: "SUCCESS", message: 'User updated successfully', statusCode: 200 });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({status:"ERROR", message: 'Internal server error',statusCode: 500  });
  }
};



exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the user from the database
    const query = 'DELETE FROM users WHERE id = ?';
    const result = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ status:"SUCCESS",message: 'User deleted successfully',statusCode: 200  });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ status:"ERROR", message: 'Internal server error',statusCode: 500 });
  }
};


