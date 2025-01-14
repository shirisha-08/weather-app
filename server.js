const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // This line sets the port number

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const weather = response.data;
    const weatherText = `It's ${weather.main.temp}°C in ${weather.name}!`;
    res.render('index', { weather: weatherText, error: null });
  } catch (error) {
    res.render('index', { weather: null, error: 'Error, please try again' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

