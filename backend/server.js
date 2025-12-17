import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("body==>",req.body)
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Portfolio Contact",
          email: process.env.SENDER_EMAIL,
        },
        to: [
          {
            email: process.env.EMAIL_TO,
            name: "Harsh",
          },
        ],
        subject: `Portfolio Contact | ${name}`,
        htmlContent: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b><br/>${message}</p>
        `,
      }),
    });
console.log("checking==>",{
        sender: {
          name: "Portfolio Contact",
          email: process.env.SENDER_EMAIL,
        },
        to: [
          {
            email: process.env.EMAIL_TO,
            name: "Harsh",
          },
        ],
        subject: `Portfolio Contact | ${name}`,
        htmlContent: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b><br/>${message}</p>
        `,
      })
    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({ success: false, message: "Email failed" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
