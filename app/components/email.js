const nodemailer = require('nodemailer');
const keys = require('../../config/keys')

module.exports = (req, res, next) => {
	// create reusable transporter object using the default SMTP transport
	transporter = nodemailer.createTransport({
	    service: 'gmail',
	    port: 587,
	    secure: false, // true for 465, false for other ports
	    auth: {
	        user: keys.gmail.user, 
	        pass: keys.gmail.pass 
	    }
	})

	// setup email data with unicode symbols
	mailOptions = {
	    from: `"❗${req.body.name}❗" <${req.body.email}>`, // sender address
	    to: 'kodieivie@gmail.com', // list of receivers
	    subject: req.body.subject, // Subject line
	    text: '', // plain text body
	    html: `<h2>From: ${req.body.name}</h2>
	    	   <h2>Email: ${req.body.email}</h2> 
	    	   <h4>Subject: ${req.body.subject}</h4>
	    	   <h4>Message: ${req.body.message}</h4>
	    	   <h4>IpAddress: ${req.body.uip}</h4>` // html body
	},

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log(info);
		res.sendStatus(200)
	})
}