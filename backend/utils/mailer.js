const sgMail = require('@sendgrid/mail');

require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
    return sgMail.send({
        to,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject,
        html,
    });
};

module.exports = sendEmail;