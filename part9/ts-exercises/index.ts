import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express = require('express'); 
const app = express();
app.use(express.json())

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

app.post('/exercises', (req, res) =>{
  console.log(req.body)
  const body = req.body;

  if(!body.daily_exercises || !body.target){
    res.status(400).send({error: 'bad request: missing parameters'})
  }
  
  const daily_exercises: number[] = body.daily_exercises;
  const target: number = body.target;

  if(isNaN(target) || daily_exercises.some(isNaN)){
    res.status(400).send({ error: 'bad request: malformatted parameters' })
  }

  try{
      const result = calculateExercises(daily_exercises, target);

      res.send({result}).status(200);
  }catch(error){
      if(error instanceof Error){
        res.status(400).send({ error: error.message })
      }

      res.status(400).send({ error: 'something went wrong' });
  }
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});