const fs = require('fs');
const path = require('path');
const config = require('../../config/config');

const sendVerificationEmail = (token) => {
  const verificationEmailUrl = `${config.front_domain}/verify-email?token=${token}`;
  return new Promise(async (resolve, reject) => {
    const keywords = ['{{email_title_strong}}', '{{email_main_content}}'];

    const replace_values = [
      `Verification Mail`,
      `<b>Dear User, </b>
      <br /><br />
      To verify your email, <a href=${verificationEmailUrl}>Click Here</a> 
      If you did not create an account, then ignore this email.`,
    ];

    generateTemplate(keywords, replace_values).then(resolve);
  });
};

const sendResetPasswordEmail = (token, type = 'user') => {
  const frontUri = type === 'admin' ? config.admin_front_domain : config.front_domain;
  const user = type === 'admin' ? 'Admin' : 'User';
  console.log(frontUri, '+++++++++++++++___');

  return new Promise((resolve) => {
    const resetPasswordUrl = `${frontUri}/reset-password?token=${token}`;
    // console.log(resetPasswordUrl, '+rest++++++++++++++');
    const keywords = ['{{email_title_strong}}', '{{email_main_content}}'];

    const replace_values = [
      `Reset Password`,
      `<b>Dear ${user}, <b/>
      <br /><br />
      To reset your password, <a href=${resetPasswordUrl}>Click Here</a> 
       If you did not request any password resets, then ignore this email.`,
    ];

    generateTemplate(keywords, replace_values).then(resolve);
  });
};

const generateTemplate = (keywords, replace_values) => {
  return new Promise(async (resolve, reject) => {
    const html = await fs.readFileSync(path.resolve('src', 'helper', 'email', 'emailTemplate.html'), 'utf8');

    let replaced_html = html;
    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i];
      const replace_value = replace_values[i];
      const array_split = replaced_html.split(keyword);
      const afterJoin = array_split.join(`${replace_value}`);
      replaced_html = afterJoin;
    }
    resolve(replaced_html);
  });
};

// const testMail = (randomCode, update = false) => {
//   return new Promise((resolve) => {
//     const keywords = ['{{email_title_strong}}', '{{email_main_content}}'];

//     const replace_values = [
//       `Hello Test`,
//       `<b>This is test email
// 	  <br /><br />
// 	  from : <b>Developer</b>
// 	  <br /><br />
// 	 <b/>`,
//     ];

//     generateTemplate(keywords, replace_values).then(resolve);
//   });
// };
module.exports = {
  // testMail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
