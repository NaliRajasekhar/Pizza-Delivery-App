
const nodemailer = require('nodemailer');

async function sendOrderEmail(itemDetails, totalCost, email, customerName) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 586,
        host: 'smtp.gmail.com',
        name: 'smtp.google.com',
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const itemListHTML = itemDetails.map(item => {
        return `<li>${item.name} (Number fo items - ${item.quantity}) - ₹${item.cost.toFixed(2)}</li>`;
    }).join('');
    const mailOptions = {
        from:  process.env.EMAIL_USER,
        to: email ,
        subject: `Your Pizza Order Receipt - Order #${new Date().getTime()}`,
        html: `
        <h2>Pizza Order Confirmation</h2>
        <h3>Thank you for your order, ${customerName.toUpperCase()}!</h3>
      <p>We have received your order with the following details:</p>
       <p><strong>Order Number:</strong> ${new Date().getTime()}</p>
      <p><strong>Items Ordered:</strong></p>
      <ul>
          ${itemListHTML}
        </ul>
       <p><strong>Total Cost: ₹${totalCost.toFixed(2)}</strong></p>
      <p>Your pizza will be delivered soon! Thank you for choosing our service!</p>
      <p>If you have any questions, feel free to contact us at nalirajasekhar444@gmail.com</p>
      `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.error('Error sending email:', err);
        throw new Error('Failed to send email');
    }
}

module.exports = sendOrderEmail;