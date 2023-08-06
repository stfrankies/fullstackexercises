import express = require('express');
var cors = require('cors');
import routeDiagnoses from '../routes/diagnoses';
import routePatients from '../routes/patients';

const app = express();
app.use(express.json());
app.use(cors())


const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', routeDiagnoses);
app.use('/api/patients', routePatients)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});