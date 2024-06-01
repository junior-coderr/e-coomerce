// import { resend } from "./resend";
import VerificationEmail from "../../emails/verficationEmail";
import nodemailer from "nodemailer";
import { renderEmail } from "react-html-email";

export const sendVerificationEmail = async (email, username, verifyCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "pratikmishra1833@gmail.com",
          pass: "bdmp knzo cqyl popv",
        },
      });
      // const html = ReactDOMServer.renderToStaticMarkup(

      // );

      let mailOptions = {
        from: "pratikmishra1833@gmail.com",
        to: email,
        subject: "Test Email",
        // html: `<h1>Hello ${username}, here is your verification code: ${verifyCode}</h1>`,
        html: renderEmail(
          <VerificationEmail username={username} otp={verifyCode} />
        ),
      };

      // return { success: true, message: "Verification email sent" };
      const info = await transporter.sendMail(mailOptions);
      resolve({ success: true, message: "Verification email sent" });
    } catch (error) {
      console.error("error sending verification email: ", error);

      reject({ success: false, message: "Error sending verification email" });
    }
  });
};
