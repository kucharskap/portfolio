const express = require('express');
const nodemailer = require('nodemailer');
const router  = express.Router();
const hbs = require('hbs');
const fs = require('fs');

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
  const { senderEmail, message, name } = req.body;
  let success = false;
  
    transport.sendMail({
      from: "Your Portfolio <website@example.com>",
      to: 'kucharskap@gmail.com',
      subject: `Message from your portfolio`, 
      text: `
      Email: ${senderEmail}
      Message: ${message}
      Name: ${name}`,
      html: `
      <h2>Sender's email:</h2> ${senderEmail} <br>
      <h2>Sender's name:</h2>${name}<br>
      <h2>Message:</h2> ${message}`
    })
    .then((result)=>{
      res.redirect('/#contact');
      success = true;
    })
    .catch((err)=>{
      next(err);
    })
});



// router.get('/projects', (req, res, next) => {
//   res.render('layout-projects');
// });




module.exports = router;

