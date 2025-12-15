import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* CONTACT FORM */
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // MUST be false for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Email failed",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
