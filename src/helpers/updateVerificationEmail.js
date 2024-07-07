import ChangeEmail from "../../emails/change_email.jsx";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

export const updateVerificationEmail = async (token, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.GMAIL_PASS,
        },
      });

      let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Test Email",

        html: render(<ChangeEmail email={email} token={token} />),
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
