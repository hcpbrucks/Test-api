const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/pv", async (req, res) => {
  const response = await axios.post(
    "https://API-URL-HIER",
    {
      action: "getSmartDogs",
      apikey: process.env.PV_API_KEY
    },
    { headers: { "Content-Type": "application/json" } }
  );

  res.json(response.data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
