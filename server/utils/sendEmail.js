/**
 * @desc    This function is used for sending email
 * @author  Harshit Kishor
 * @since   2021
 */

const nodemailer = require('nodemailer');
/**
 *  functions that used for sending email
 *
 */

/**
 * 
 * @param {*} length length of token string
 */
async function sendNodeEmail({ from, to, subject, text, html }) {

    /*  let transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
             user: config.EMAIL_USER,
             pass: config.EMAIL_PASS
         }
     }); */

    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let mailDetails = {
        from,
        to,
        subject,
        text,
        html
    };

    transporter.sendMail(mailDetails, (err, data) => {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(data));
            return true
        }
    });
};
module.exports = { sendNodeEmail }