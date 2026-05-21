import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (email, alias) => {
  try {
    const mailOptions = {
      from: `"RoachSwap Colony" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "You are now part of the swarm. 🪳 Main Bhi Cockroach.",
      text: `
Hey ${alias},

You just joined the colony.

Your rank: Hatchling.
Your mission: build something.

→ Post your first Anthill: ${process.env.CLIENT_URL}/anthill
→ List a skill on Moult Market: ${process.env.CLIENT_URL}/moult
→ Read the C4I Manifesto: ${process.env.C4I_WEBSITE}

We survived 300 million years.
We will survive this system too.

— The RoachSwap Colony
Funded by frustration. Sponsored by no one.
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
  }
};
