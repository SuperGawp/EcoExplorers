const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware
const app = express();

app.use(bodyParser.json());
app.use(cors()); // Use the CORS middleware to allow cross-origin requests

app.post('/calculate-emissions', (req, res) => {
  const { transportMode, distance, energySource, energyConsumption } = req.body;

  // Define emissions factors (g CO2 per unit)
  const emissionsFactors = {
    car: 120, // g CO2 per mile
    bike: 0,  // g CO2 per mile
    electricity: 50, // g CO2 per kWh
  };

  let totalEmissions = 0;

  if (transportMode in emissionsFactors) {
    if (transportMode === 'electricity') {
      totalEmissions = emissionsFactors[transportMode] * energyConsumption;
    } else {
      totalEmissions = emissionsFactors[transportMode] * distance;
    }

    res.json({ totalEmissions });
  } else {
    res.status(400).json({ error: 'Invalid transport mode' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
