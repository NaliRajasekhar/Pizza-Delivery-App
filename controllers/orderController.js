// controllers/orderController.js
const db = require('../config/db');
const sendOrderEmail = require('../utils/email');
const CONSTANTS = require('../constants');

exports.createOrder = async (req, res,next) => {
  const items = req.body.items; 
  const total = req.body.total;

  try {
   
    const orderResult = await db.query('INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)', [req.user.id, JSON.stringify(items), total]);

    let result;
    if (req.user.id) {
      [result] = await db.query('SELECT email, name FROM users WHERE id = ?', [req.user.id]);
    }

    if (result.length > 0) {
      const email = result[0].email;
      const customerName = result[0].name;

      const itemIds = items.map(item => item.itemId);
      const itemQuantities = items.map(item => item.quantity);

      const [menuItems] = await db.query('SELECT id, name, price FROM menu_items WHERE id IN (?)', [itemIds]);

      const itemDetails = items.map(item => {
        const menuItem = menuItems.find(menuItem => menuItem.id === item.itemId);
        return {
          name: menuItem ? menuItem.name : 'Unknown Item',
          quantity: item.quantity,
          cost: (menuItem ? menuItem.price : 0) * item.quantity
        };
      });

      const totalCost = itemDetails.reduce((acc, item) => acc + item.cost, 0);

      await sendOrderEmail(itemDetails, totalCost, email, customerName);

      res.status(200).json({ status: "SUCCESS", message: 'Order placed successfully' ,statusCode: 200});
    } else {
      res.status(404).json({status:"ERROR" , message: 'User not found',statusCode: 404 });
    }

  } catch (err) {
    console.error('Error:', err.message);
    return next(createError(err.message, CONSTANTS.STATUS_CODES.INTERNAL_ERROR));
  }
};

