import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/send-email", async (req, res) => {
  console.log("📩 /send-email HIT");
  console.log("BODY:", req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.log("❌ Missing fields");
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
          email: process.env.EMAIL_SENDER,
        },
        to: [
          {
            email: process.env.EMAIL_TO,
            name: "Harsh",
          },
        ],
        replyTo: {
          email,
          name,
        },
        subject: `Portfolio Contact | ${name}`,
        htmlContent: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
        `,
      }),
    });

    const text = await response.text();
    console.log("📤 BREVO STATUS:", response.status);
    console.log("📤 BREVO RESPONSE:", text);

    if (!response.ok) {
      return res.status(500).json({
        success: false,
        message: "Brevo API error",
        brevo: text,
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("🔥 SERVER ERROR:", err);
    res.status(500).json({ success: false, message: "Server crashed" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
