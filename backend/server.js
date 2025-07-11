const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { validateBody } = require("./src/validations/validations");
const { generateRandomHeadline } = require("./src/utils/constants");

const PORT = process.env.PORT ?? 3000;

const app = express();

// Middleware
app.use(express.json());



const allowedOrigins = [process.env.FRONTEND_DEV_URL, process.env.FRONTEND_URL];



app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);


// API for Business Data
app.post("/business-data", async (req, res) => {
  try {
    const { name, location } = req.body;

    // Validate the Request Body
    validateBody({ name, location });

    // Generate Random Headline with Name and Location
    const headline = generateRandomHeadline(name, location);

    return res.json({
      data: {
        rating: 4.3,
        reviews: 130,
        headline,
      },
    });
  } catch (e) {
    console.log("ERROR:", e.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// API for Regenerating Headline
app.get("/regenerate-headline", async (req, res) => {
  try {
    const { name, location } = req.query;

    // Validate the Query Parameters
    validateBody({ name, location });

    // Generate Random Headline with Name and Location
    const headline = generateRandomHeadline(name, location);

    return res.json({ headline });
  } catch (e) {
    console.log("ERROR:", e.message);
    return res.status(400).json({ message: e.message });
  }
});

// Start the Server
const initializeServer = () => {
  try {
    app.listen(PORT, () => console.log(`Server started listening on ${PORT}`));
  } catch (e) {
    console.log("SERVER INITIALIZATION ERROR:", e.message);
    process.exit(1);
  }
};

// Initializing the Server
initializeServer();
