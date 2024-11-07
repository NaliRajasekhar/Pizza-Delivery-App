const db = require('../config/db');


// controllers/cartController.js
exports.addToCart = async (req, res) => {
    console.log("req.body", req.body);
    const { item_id, quantity } = req.body;

    try {
        // Check if the item exists in the `menu_items` table
        const [itemResults] = await db.query('SELECT * FROM menu_items WHERE id = ?', [item_id]);

        if (itemResults.length === 0) {
            return res.status(400).json({ status: "ERROR", message: 'Invalid item_id: Item does not exist', statusCode: 400 });
        }

        // Insert the item into the `cart` table
        await db.query(
            'INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)',
            [req.user.id, item_id, quantity]
        );

        res.status(201).json({ status: "SUCCESS", message: 'Item added to cart', statusCode: 201 });
    } catch (err) {
        console.error('Error adding item to cart:', err.message);
        res.status(500).json({ status: "ERROR", message: 'Internal server error', statusCode: 500 });
    }
};



// View Cart - Get all items in the user's cart
exports.viewCart = async (req, res) => {
    console.log("request user", req.user);
    const userId = req.user.id; // Assume user ID is available in req.user from authentication middleware

    try {
        // Query to retrieve all items in the user's cart and join with `menu_items` to get item details
        const query = `
            SELECT cart.id, cart.item_id, cart.quantity, menu_items.name, menu_items.description, menu_items.price
            FROM cart
            JOIN menu_items ON cart.item_id = menu_items.id
            WHERE cart.user_id = ?;
        `;

        // Execute query and destructure the result to get the rows
        const [rows] = await db.query(query, [userId]); // Try using `db.query` if `db.execute` is problematic
        console.log("rows", rows);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Your cart is empty' });
        }

        res.status(200).json({ cartItems: rows });
    } catch (error) {
        console.error('Error retrieving cart items:', error.message);
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
