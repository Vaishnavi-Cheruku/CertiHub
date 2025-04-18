import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP Connection Failed:', error);
    } else {
        console.log('✅ SMTP Connection Successful');
    }
});


export default transporter;
