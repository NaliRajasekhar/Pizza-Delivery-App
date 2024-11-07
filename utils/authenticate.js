// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Check if the Authorization header is present
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({status: "ERROR", message: 'Authorization token required', statusCode: 401 });
  }

  // Extract the token (assuming the format is "Bearer <token>")
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({status: "ERROR", message: 'Invalid token format', statusCode: 401});
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ status: "ERROR", message: 'Invalid or expired token',statusCode: 403 });
  }
};

module.exports = { authenticate };

