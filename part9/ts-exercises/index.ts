import { calculateBmi } from './bmiCalculator';
import express = require('express'); 
const app = express();

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(weight) || isNaN(height)) {
      res.send({ error: 'malformatted parameters' }).status(400);
  }

  const bmi = calculateBmi(height, weight);

  const bmiRes = {
    weight, 
    height, 
    bmi
  };
  res.send(bmiRes).status(200);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});