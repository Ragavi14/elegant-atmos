require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

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
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// Express 5 Compatibility Fix instead of app.options("*")
app.use(cors());

app.use(express.json());

/* =========================
   SALESFORCE AUTH HELPER FUNCTION (UPDATED TO MATCH POSTMAN)
========================= */
async function getSalesforceAccessToken() {
  const client_id = process.env.SF_CLIENT_ID; 
  const client_secret = process.env.SF_CLIENT_SECRET;
  const username = process.env.SF_USERNAME;
  const password = process.env.SF_PASSWORD;

  // We append parameters directly to the URL string to mirror your working Postman request
  const authUrl = `https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=${encodeURIComponent(client_id)}&client_secret=${encodeURIComponent(client_secret)}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

  console.log("Sending Auth Request to Salesforce...");
  
  const response = await axios.post(authUrl, {}, {
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded" 
    }
  });

  return response.data; // Returns { access_token, instance_url }
}

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
      return res.status(401).json({ success: false, message: "Access Denied" });
    }

    const adminUser = rows[0];

    if (password !== adminUser.password) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    return res.status(200).json({
      success: true,
      user: { username: adminUser.username, role: adminUser.role }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* =========================
   CONTACT FORM API 
========================= */
app.post("/api/contact", async (req, res) => {
  // console.log("FORM DATA RECEIVED:", req.body);

  // Destructure formType along with your other fields
  const { fullName, phone, email, message, formType } = req.body;

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

  const assignedFormType = (formType && formType.trim() !== "") ? formType.trim() : "generic";

  try {
    /* ========================================================
       1. STORE DATA IN LOCAL DATABASE (With form_type column)
       ======================================================== */
    await db.execute(
      `INSERT INTO leads (full_name, phone, email, message, form_type) VALUES (?, ?, ?, ?, ?)`,
      [fullName.trim(), phone, email, message || "", assignedFormType]
    );
    // console.log("Step 1: Local DB Insert Success");

    // 2. Authenticate with Salesforce using our updated function
    const tokenData = await getSalesforceAccessToken();
    // console.log("Step 2: Salesforce Token Acquired");

    /* ========================================================
       SPLIT FULL NAME FOR SALESFORCE COMPLIANCE
       ======================================================== */
    const nameParts = fullName.trim().split(/\s+/);
    let firstName = "";
    let lastName = "";

    if (nameParts.length > 1) {
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(" ");
    } else {
      firstName = "";
      lastName = nameParts[0] || "Lead";
    }

    /* ========================================================
       3. MAP DATA PAYLOAD TO MATCH SALESFORCE FIELDS
       ======================================================== */
    const salesforcePayload = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: phone,
      Company: "Individual", 
      Source_Type__c: "",
      Projects__c: "Elegant Atmos", 
      Description: message || "" 
    };

    // console.log("Step 3: Forwarding Lead to Salesforce...");
    const salesforceLeadUrl = `${tokenData.instance_url}/services/data/v62.0/sobjects/Lead`;

    const sfResponse = await axios.post(salesforceLeadUrl, salesforcePayload, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json"
      }
    });

    // console.log("Salesforce Sync Success! Lead ID:", sfResponse.data.id);

    return res.status(200).json({
      success: true,
      message: "Lead submitted and forwarded successfully",
      salesforceId: sfResponse.data.id
    });

  } catch (error) {
    // console.error("❌ CONTACT API FAILURE DETAILS:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Lead processing failed",
      error: error.response?.data || error.message
    });
  }
});

/* =========================
   GET LEADS API
========================= */
app.get("/api/leads", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM leads ORDER BY id DESC");
    return res.status(200).json(rows);
  } catch (error) {
    console.log("LEADS ERROR:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

/* =========================
   DELETE LEAD API
========================= */
app.delete("/api/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM leads WHERE id = ?", [id]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

/* =========================
   REACT BUILD
========================= */
app.use(express.static(path.join(__dirname, "..", "build")));

/* =========================
   REACT ROUTES FIX
========================= */
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});