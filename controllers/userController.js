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
    next(err)
  }
};


exports.updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
  }, { abortEarly: false });

  // Validate the request body
  const { error, value } = schema.validate(req.body);
  if (error) {
    return next(createError(error.details[0].message, CONSTANTS.STATUS_CODES.BAD_REQUEST));
  }
  const { name, email, address } = value;

  try {
    const query = 'UPDATE users SET name = ?, email = ?, address = ? WHERE id = ?';
    const result = await db.execute(query, [name, email, address, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: "ERROR", message: 'User not found', statusCode: 404 });
    }
    res.status(200).json({ status: "SUCCESS", message: 'User updated successfully', statusCode: 200 });
  } catch (error) {
    next(error);
  }
};



exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM users WHERE id = ?';
    const result = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(200).json({ status: "SUCCESS", message: 'User deleted successfully', statusCode: 200 });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {


  try {
    const query = 'select * FROM users';
    const result = await db.execute(query);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(200).json({ status: "SUCCESS", message: 'User fetched successfully', statusCode: 200, data: result });
  } catch (error) {
    next(error);
  }
};

exports.getUsersById = async (req, res, next) => {

  const userId = req.body.user_id;
  try {
    const query = 'SELECT name,email,address,status,password FROM users WHERE id = ?';
    const [result ]= await db.execute(query, [userId]);
    

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(200).json({ status: "SUCCESS", message: 'User fetched successfully', statusCode: 200, data: result });
  } catch (error) {
    next(error);
  }
};


