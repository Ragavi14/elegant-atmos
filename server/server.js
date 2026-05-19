const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

const db = require("./config/db");

const app = express();

/* =========================
   MYSQL TEST
========================= */

db.getConnection()
  .then(() => {
    console.log("MYSQL CONNECTED");
  })
  .catch((err) => {
    console.log("MYSQL ERROR:", err);
  });

/* =========================
   MIDDLEWARE
========================= */

// app.use(cors());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.options("*", cors());

app.use(express.json());

/* =========================
   ADMIN LOGIN API
========================= */

app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE username = ? AND role = "admin" LIMIT 1',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Access Denied"
      });
    }

    const adminUser = rows[0];

    if (password !== adminUser.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        username: adminUser.username,
        role: adminUser.role
      }
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
});

/* =========================
   CONTACT FORM API
========================= */

app.post("/api/contact", async (req, res) => {

  console.log("FORM DATA:", req.body);

  const { fullName, phone, email, message } = req.body;

  // 1. Validation
  if (!fullName || !phone || !email) {
    return res.status(400).json({
      success: false,
      message: "Name, phone and email are required"
    });
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Invalid mobile number"
    });
  }

  try {
    // 2. Store data in your local database
    await db.execute(
      `INSERT INTO leads
      (full_name, phone, email, message)
      VALUES (?, ?, ?, ?)`,
      [fullName, phone, email, message || ""]
    );

    console.log("DATABASE INSERT SUCCESS");

    // 3. Forward data to the Client's API Link
    // const clientApiUrl = "PASTE_THE_CLIENTS_API_LINK_HERE"; 
    
    // const clientResponse = await fetch(clientApiUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
        
    //   },
    //   body: JSON.stringify({
    //     fullName: fullName,
    //     phone: phone,
    //     email: email,
    //     message: message || ""
    //   })
    // });

    // if (clientResponse.ok) {
    //   console.log("FORWARDED TO CLIENT API SUCCESSFULLY");
    // } else {
    //   console.error("CLIENT API REJECTED DATA:", clientResponse.statusText);
    // }

    // 4. Send response back to your website frontend
    return res.status(200).json({
      success: true,
      message: "Lead submitted and forwarded successfully"
    });

  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* =========================
   GET LEADS API
========================= */

app.get("/api/leads", async (req, res) => {

  try {

    const [rows] = await db.execute(
      "SELECT * FROM leads ORDER BY id ASC"
    );

    return res.status(200).json(rows);

  } catch (error) {

    console.log("LEADS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
});

/* =========================
   DELETE LEAD API
========================= */

app.delete("/api/leads/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await db.execute(
      "DELETE FROM leads WHERE id = ?",
      [id]
    );

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    console.log("DELETE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
});

/* =========================
   REACT BUILD
========================= */

app.use(
  express.static(
    path.join(__dirname, "..", "build")
  )
);

/* =========================
   REACT ROUTES FIX
========================= */

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "build", "index.html")
  );
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});