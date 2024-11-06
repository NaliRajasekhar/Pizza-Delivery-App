// controllers/orderController.js
const nodemailer = require('nodemailer');

exports.createOrder = (req, res) => {
  const items = req.body.items; // [{ itemId, quantity }]
  const total = req.body.total;

  db.query('INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)', [req.userId, JSON.stringify(items), total], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    // Send email receipt
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: 'Your Pizza Order Receipt',
      text: `Thank you for your order! Total: $${total}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).json({ error: 'Failed to send receipt email' });
      res.status(200).json({ message: 'Order placed and receipt emailed' });
    });
  });
};
