// import { resend } from "./resend";
import ChangeEmail from "../../emails/change_email.jsx";
import nodemailer from "nodemailer";
import { renderEmail } from "react-html-email";

export const updateVerificationEmail = async (token, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "pratikmishra1833@gmail.com",
          pass: "bdmp knzo cqyl popv",
        },
      });

      let mailOptions = {
        from: "pratikmishra1833@gmail.com",
        to: email,
        subject: "Test Email",
        html: renderEmail(<ChangeEmail email={email} token={token} />),
      };
      //
      const info = await transporter.sendMail(mailOptions);
      resolve({
        success: true,
        message: `Verification email sent to ${email}`,
      });
    } catch (error) {
      console.error("error sending verification email: ", error);

      reject({ success: false, message: "Error sending verification email" });
    }
  });
};
