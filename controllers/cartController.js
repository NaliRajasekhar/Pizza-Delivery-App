const db = require('../config/db');


// controllers/cartController.js
exports.addToCart = (req, res) => {
    console.log("req.body", req.body);
    const { item_id, quantity } = req.body;

    db.query(
        'INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)',
        [req.user.id, item_id, quantity],
        (err) => {
            if (err) return res.status(500).json({ status: "ERROR", message: err.message, statusCode: 500 });
            res.status(201).json({ status: "SUCCESS", message: 'Item added to cart', statusCode: 201 });
        }
    );
};

// View Cart - Get all items in the user's cart
exports.viewCart = async (req, res) => {
    console.log("request user", req.user);
    const userId = req.user.id; // Assume user ID is available in req.user from authentication middleware

    try {
        // Query to retrieve all items in the user's cart
        const query = 'SELECT * FROM cart WHERE user_id = ?';
        const cartItems = await db.execute(query, [userId]);

        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'Your cart is empty' });
        }

        res.status(200).json({ cartItems });
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Remove from Cart - Delete a specific item from the user's cart
exports.removeFromCart = async (req, res) => {
    const userId = req.user.id; // Assume user ID is available in req.user from authentication middleware
    const { itemId } = req.params;

    try {
        // Query to delete the specific item from the user's cart
        const query = 'DELETE FROM cart WHERE user_id = ? AND item_id = ?';
        const result = await db.execute(query, [userId, itemId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
