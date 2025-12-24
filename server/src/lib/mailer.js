import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let _transporter = null;
let _isTestAccount = false;

async function getTransporter() {
  if (_transporter) return { transporter: _transporter, isTest: _isTestAccount };

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;

  if (!host || !user) {
    // no real SMTP configured — use Ethereal (nodemailer test account)
    const testAccount = await nodemailer.createTestAccount();
    _transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    _isTestAccount = true;
    console.warn('Mailer: No SMTP credentials found — using Ethereal test account. Emails will not be delivered to real inboxes.');
    console.warn(`Ethereal user: ${testAccount.user}`);
  } else {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    _isTestAccount = false;
  }

  return { transporter: _transporter, isTest: _isTestAccount };
}

export const sendOtpEmail = async ({ to, otp }) => {
  const { transporter, isTest } = await getTransporter();

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER || `"Chat App" <no-reply@localhost>`,
    to,
    subject: `Your verification code`,
    text: `Your verification code is: ${otp}`,
    html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
  };

  const info = await transporter.sendMail(mailOptions);

  if (isTest) {
    // nodemailer provides a preview URL for Ethereal accounts
    const preview = nodemailer.getTestMessageUrl(info);
    console.info('Ethereal preview URL:', preview);
    return { info, preview };
  }

  return { info };
};

export default getTransporter;
