const express = require('express');
const nodemailer = require('nodemailer');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.gmail_user,
    pass: process.env.gmail_pass
  }
})

router.post('/process-message', (req, res, next)=>{
  const { senderEmail, message } = req.body;
    
    transport.sendMail({
      from: "Your Portfolio <website@example.com>",
      to: 'kucharskap@gmail.com',
      subject: `Message from your portfolio`, 
      text: `
      Email: ${senderEmail}
      Message: ${message}`,
      html: `
      <h2>Sender:</h2> ${senderEmail} <br>
      <h2>Message:</h2> ${message}`
    })
    .then((result)=>{
      res.redirect('/#contact');
    })
    .catch((err)=>{
      next(err);
    })
  });

module.exports = router;
