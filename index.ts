import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" })
  } else {
    const bmi = calculateBmi(height, weight)
    res.send({
      weight, height, bmi
    })
  }
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});