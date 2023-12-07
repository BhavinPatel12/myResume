const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");
const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch(() =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}
/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: `${config.email.from}`, to, subject, text };
  await transport.sendMail(msg);
};
const sendMail = async (to, subject, html) => {
  console.log("config.email.from", config.email.from);
  // console.log('html', html);
  let info = await transport.sendMail({
    from: `${config.email.from}`, // sender address
    to,
    subject,
    html,
  });
  console.info("info.messageId : ", info.messageId);
};
/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token, type = "user") => {
  const frontUri =
    type === "admin" ? config.admin_front_domain : config.front_domain;
  const subject = "Reset password";
  //  replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://${frontUri}/reset-password?token=${token}`;
  const text = `Dear Admin,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};
/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://${config.front_domain}/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};
module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendMail,
};
