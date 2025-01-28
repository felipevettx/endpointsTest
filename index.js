const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

let listings = [];
let totalScraped = 0;

// GET route
app.get("/listings", (req, res) => {
  res.json({ listings, totalScraped });
});

// POST route
app.post("/listings", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(" ")[1] : null;

  const { scrapedData, totalScraped: newTotalScraped } = req.body;

  listings = [...listings, ...scrapedData];
  totalScraped = newTotalScraped;

  res.status(200).json({
    message: "Data received successfully",
    itemCount: scrapedData.length,
    totalScraped: totalScraped,
    token: token,
  });
});

// DELETE route
app.delete("/listings", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(" ")[1] : null;

  listings = [];
  totalScraped = 0;

  res.status(200).json({
    message: "List cleared successfully",
    token: token,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
