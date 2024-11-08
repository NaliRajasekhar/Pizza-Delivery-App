const db = require('../config/db');
const CONSTANTS = require('../constants');

exports.addToCart = async (req, res,next) => {
    const { item_id, quantity } = req.body;

    try {

        const [itemResults] = await db.query('SELECT * FROM menu_items WHERE id = ?', [item_id]);

        if (itemResults.length === 0) {
            return res.status(400).json({ status: "ERROR", message: 'Invalid item_id: Item does not exist', statusCode: 400 });
        }

        await db.query(
            'INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)',
            [req.user.id, item_id, quantity]
        );

        res.status(201).json({ status: "SUCCESS", message: 'Item added to cart', statusCode: 201 });
    } catch (error) {
        console.error('Error adding item to cart:', error.message);
        return next(createError(error.message, CONSTANTS.STATUS_CODES.INTERNAL_ERROR));
    }
};


exports.viewCart = async (req, res, next) => {
    const userId = req.user.id; 
    try {
        const query = `
            SELECT cart.id, cart.item_id, cart.quantity, menu_items.name, menu_items.description, menu_items.price
            FROM cart
            JOIN menu_items ON cart.item_id = menu_items.id
            WHERE cart.user_id = ?;
        `;

        const [rows] = await db.query(query, [userId]); 

        if (rows.length === 0) {
            return res.status(404).json({ status:"ERROR",message: 'Your cart is empty',statusCode:404 });
        }

        res.status(200).json({ status: "SUCCESS",cartItems: rows,statusCode: 200 });
    } catch (error) {
        return next(createError(error.message, CONSTANTS.STATUS_CODES.INTERNAL_ERROR));
    }
};


exports.removeFromCart = async (req, res, next) => {
    const userId = req.user.id; 
    const { itemId } = req.params;

    try {
       
        const query = 'DELETE FROM cart WHERE user_id = ? AND item_id = ?';
        const result = await db.execute(query, [userId, itemId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({status:"ERROR", message: 'Item not found in cart',statusCode:404 });
        }

        res.status(200).json({ status: "SUCCESS", message: 'Item removed from cart successfully',statusCode: 200 });
    } catch (error) {
        return next(createError(error.message, CONSTANTS.STATUS_CODES.INTERNAL_ERROR));
    }
};
