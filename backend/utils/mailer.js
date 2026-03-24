require('dotenv').config();//importing env file

const sgMail = require('@sendgrid/mail');//importing mail sender library

sgMail.setApiKey(process.env.SENDGRID_API_KEY);//assigning apikey to sendGrid events

const sendEmail = async ({ to, subject, html }) => {
    return sgMail.send({
        to,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject,
        html,
    });
};//defining body of the mail sent by us

module.exports = sendEmail;//exporting utility