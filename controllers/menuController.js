
exports.getMenuItems = (req, res) => {
  const menuItems = [
    [
      { id: 1, title: 'Margherita', description: 'Classic cheese pizza', price: 99, imageUrl:'https://www.dominos.co.in/files/items/Margherit.jpg' },
      { id: 2, title: 'Pepperoni', description: 'Pepperoni pizza', price: 149, imageUrl:'https://www.dominos.co.in/files/items/Mexican_Green_Wave.jpg' },
      { id: 3, title: 'Veggie Supreme', description: 'A delicious mix of vegetables on a cheesy base', price: 149, imageUrl:'https://www.dominos.co.in/files/items/Peppy_Paneer.jpg'},
      { id: 4, title: 'BBQ Chicken', description: 'Chicken topped with BBQ sauce and cheese', price: 119, imageUrl: "https://www.dominos.co.in/files/items/Corn_&_Cheese.jpg" },
      { id: 5, title: 'Hawaiian', description: 'Ham and pineapple pizza with cheese', price: 89, imageUrl: "https://www.dominos.co.in/files/items/Digital_Veggie_Paradise_olo_266x265.jpg" },
      { id: 6, title: 'Four Cheese', description: 'Mozzarella, cheddar, parmesan, and gouda cheese blend', price: 99, imageUrl: "https://www.dominos.co.in/files/items/IndianTandooriPaneer.jpg"  },
      { id: 7, title: 'Meat Lovers', description: 'A hearty mix of bacon, sausage, pepperoni, and beef', price: 299, imageUrl: "https://www.dominos.co.in/files/items/Pepper_Barbeque_&_Onion.jpg"  },
      { id: 8, title: 'Seafood Feast', description: 'Shrimp, mussels, and tuna with garlic sauce', price: 139, imageUrl: "https://www.dominos.co.in/files/items/MicrosoftTeams-image_(20).png"  },
      { id: 9, title: 'Pesto Chicken', description: 'Grilled chicken with pesto sauce and mozzarella', price: 119, imageUrl: "https://www.dominos.co.in/files/items/MicrosoftTeams-image_(11).png"  },
      { id: 10, title: 'Buffalo Chicken', description: 'Spicy buffalo chicken with blue cheese dressing', price: 129, imageUrl: "https://www.dominos.co.in/files/items/MicrosoftTeams-image_(14).png"  }
    ]
  ];
  res.status(200).json(menuItems);
};
