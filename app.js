const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const basicAuth = require("express-basic-auth");

const app = express();
const PORT = 3000;

// 1. IP Filtering
function ipFilter(req, res, next) {
  const allowed = ["127.0.0.1", "::1"];
  if (allowed.includes(req.ip)) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}
app.use(ipFilter);

// 2. CORS
app.use(cors({
  origin: "http://localhost:3000"
}));

// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});
app.use(limiter);

// 4a. Bearer Token
function bearerAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader === "Bearer my_secret_token") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

// 4b. Basic Auth
app.use("/dashboard", basicAuth({
  users: { "admin": "password123" },
  challenge: true
}));

// --- Endpoints ---

// Oil Prices (Bearer Token)
app.get("/api/oil-prices", bearerAuth, (req, res) => {
  res.json({
    market: "Global Energy Exchange",
    last_updated: "2026-03-15T12:55:00Z",
    currency: "USD",
    data: [
      { symbol: "WTI", name: "West Texas Intermediate", price: 78.45, change: 0.12 },
      { symbol: "BRENT", name: "Brent Crude", price: 82.30, change: -0.05 },
      { symbol: "NAT.GAS", name: "Natural Gas", price: 2.15, change: 0.02 }
    ]
  });
});

// Dashboard (Basic Auth)
app.get("/dashboard", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Oil Prices Dashboard</h1>
        <p>WTI: $78.45</p>
        <p>Brent: $82.30</p>
        <p>Natural Gas: $2.15</p>
      </body>
    </html>
  `);
});

// Logout

// Root route for homepage
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Welcome to the Oil Prices API</h1>
        <p>Available endpoints:</p>
        <ul>
          <li>/api/oil-prices (requires Bearer Token)</li>
          <li>/dashboard (requires Basic Auth)</li>
          <li>/logout</li>
        </ul>
      </body>
    </html>
  `);
});

app.get("/logout", (req, res) => {
  res.send("Logged Out");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});