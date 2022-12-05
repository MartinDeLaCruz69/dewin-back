const express = require('express');
const app = express();
const cors = require('cors');

require('./database');

app.use(cors());
app.use(express.json());
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/actividades', require('./routes/actividad'));


app.use('/api', require('./routes/index'))

app.listen(3000);
console.log('Server on port', 3000);