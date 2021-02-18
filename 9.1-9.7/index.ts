import bodyParser from 'body-parser';
import express, { Request } from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(bodyParser.json()); // for parsing application/json


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBmi(height, weight);
    res.send({
      weight, height, bmi
    });
  }
});

interface CustomRequest extends Request {
  body: {
    daily_exercises: Array<number>,
    target: number
  }
}

app.post('/exercises', (req: CustomRequest, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || target === undefined) {
    res.status(400).send({
      error: "parameters missing"
    });
  } else if (daily_exercises.some(v => isNaN(v)) || isNaN(target)) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  } else {
    const result = calculateExercises(daily_exercises, target);
    res.send(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});