import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ SEND EMAIL (BREVO API)
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Portfolio Contact",
          email: process.env.EMAIL_TO,
        },
        to: [
          {
            email: process.env.EMAIL_TO,
            name: "Harsh",
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `Portfolio Contact | ${name}`,
        htmlContent: `
          <h3>New Portfolio Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("BREVO ERROR:", data);
      return res.status(500).json({ message: "Email failed" });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
