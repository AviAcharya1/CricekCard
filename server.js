const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/cricket-game-ad', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema and model for card1
const Card1Schema = new mongoose.Schema({ value: Number });
const Card1 = mongoose.model('Card1', Card1Schema);

// Define schema and model for card2
const Card2Schema = new mongoose.Schema({ value: Number });
const Card2 = mongoose.model('Card2', Card2Schema);

app.use(express.json());

// API endpoint for card1
app.post('/api/card1', async (req, res) => {
  try {
    const card1 = new Card1({ value: req.body.value });
    await card1.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error storing card1 value in database:', error);
    res.sendStatus(500);
  }
});

// API endpoint for card2
app.post('/api/card2', async (req, res) => {
  try {
    const card2 = new Card2({ value: req.body.value });
    await card2.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error storing card2 value in database:', error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});