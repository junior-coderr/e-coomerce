import { resend } from "./resend";
import VerificationEmail from "../../emails/verficationEmail";

export const sendVerificationEmail = async (email, username, verifyCode) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Zistora, veryfication code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return { success: true, message: "Verification email sent" };
  } catch (error) {
    console.error("error sending verification email: ", error);
    return { success: false, message: "Error sending verification email" };
  }
};
