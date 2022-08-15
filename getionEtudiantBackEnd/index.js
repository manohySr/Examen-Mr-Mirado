const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

const routerEtudiant = require('./routes/etudiants');

app.use(bodyParser.json());
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server runnning in http://localhost:${PORT}`)
});

app.use('/', routerEtudiant);
