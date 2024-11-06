// controllers/menuController.js
exports.getMenuItems = (req, res) => {
    const menuItems = [
      { id: 1, name: 'Margherita', description: 'Classic cheese pizza', price: 8.99 },
      { id: 2, name: 'Pepperoni', description: 'Pepperoni pizza', price: 9.99 },
      // Add more hardcoded items as required
    ];
    res.status(200).json(menuItems);
  };
  