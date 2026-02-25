console.log("ENV SMARTDOG_API_KEY:", process.env.SMARTDOG_API_KEY ? "OK" : "FEHLT");
import express from "express";
import axios from "axios";
const app = express();
app.use(express.json());

const SMARTDOG_URL = "https://apiv2.smart-dog.eu/index.php";
const API_KEY = process.env.SMARTDOG_API_KEY;

// 1️⃣ Alle SmartDogs
app.get("/smartdogs", async (req, res) => {
  try {
    const r = await axios.post(SMARTDOG_URL, {
      action: "getSmartDogs",
      apikey: API_KEY
    });
    res.json(r.data);
  } catch (e) {
    res.status(500).json(e.response?.data || { error: "SmartDog API Fehler" });
  }
});

// 2️⃣ Alle Sensoren eines SmartDogs
app.get("/sensors/:powerDogId", async (req, res) => {
  try {
    const r = await axios.post(SMARTDOG_URL, {
      action: "getSensors",
      apikey: API_KEY,
      PowerDogID: req.params.powerDogId
    });
    res.json(r.data);
  } catch (e) {
    res.status(500).json(e.response?.data || { error: "SmartDog API Fehler" });
  }
});

// 3️⃣ Sensordaten (Zeitbereich)
app.get("/sensordata/:sensorId", async (req, res) => {
  const from = Math.floor(Date.now() / 1000) - 3600; // letzte Stunde
  const to = Math.floor(Date.now() / 1000);

  try {
    const r = await axios.post(SMARTDOG_URL, {
      action: "getSensorData",
      apikey: API_KEY,
      SensorID: req.params.sensorId,
      UTC_TIMESTAMP_FROM: from,
      UTC_TIMESTAMP_TO: to
    });
    res.json(r.data);
  } catch (e) {
    res.status(500).json(e.response?.data || { error: "SmartDog API Fehler" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SmartDog API läuft auf Port", PORT));
