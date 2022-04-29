
const nodemailer = require('nodemailer');


const registerEmail = async( data ) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      });

      // transport.verify().then(console.log).catch(console.error);

      const { email, name, token } = data;

      const info = await transport.sendMail({
        from: "EnglishJournal - Admin of EnglishJournal",
        to: email,
        subject: 'Verified your account in English Journal',
        text: 'Verified your account in English Journal',
        html: `
          <p>Hello: ${ name }, verified your account in English Journal.</p>
          <p>Your account is ready, only you should verified it in the next link:
          <a href="${ process.env.FRONTEND_URL}/verified/${ token }">Verified Account</a></p>
          <p>If you did not create this account, you can ignore this message.</p>
        `
      });

      // ${ process.env.FRONTEND_URL}/verified/${ token }

      // http://localhost:3000/verified/${ token }

      console.log("Mensaje enviado: %s", info.messageId);
}

module.exports = registerEmail;