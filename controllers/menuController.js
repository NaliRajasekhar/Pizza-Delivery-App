// controllers/menuController.js
exports.getMenuItems = (req, res) => {
  const menuItems = [
    [
      { id: 1, name: 'Margherita', description: 'Classic cheese pizza', price: 8.99 },
      { id: 2, name: 'Pepperoni', description: 'Pepperoni pizza', price: 9.99 },
      { id: 3, name: 'Veggie Supreme', description: 'A delicious mix of vegetables on a cheesy base', price: 10.49 },
      { id: 4, name: 'BBQ Chicken', description: 'Chicken topped with BBQ sauce and cheese', price: 11.49 },
      { id: 5, name: 'Hawaiian', description: 'Ham and pineapple pizza with cheese', price: 9.49 },
      { id: 6, name: 'Four Cheese', description: 'Mozzarella, cheddar, parmesan, and gouda cheese blend', price: 10.99 },
      { id: 7, name: 'Meat Lovers', description: 'A hearty mix of bacon, sausage, pepperoni, and beef', price: 12.99 },
      { id: 8, name: 'Seafood Feast', description: 'Shrimp, mussels, and tuna with garlic sauce', price: 13.49 },
      { id: 9, name: 'Pesto Chicken', description: 'Grilled chicken with pesto sauce and mozzarella', price: 11.99 },
      { id: 10, name: 'Buffalo Chicken', description: 'Spicy buffalo chicken with blue cheese dressing', price: 12.49 }
    ]

    // Add more hardcoded items as required
  ];
  res.status(200).json(menuItems);
};
