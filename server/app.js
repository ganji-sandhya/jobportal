const express = require('express');
const bodyParser = require('body-parser');
const candidates = require('./candidates.json');
const _ = require("lodash");


const app = express();
const port = 3001;

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

// API endpoint to execute a specific Python function
app.post('/candidates', (req, res) => {
  
    const candidate = req.body;

    candidate.id= _.uniqueId();

    candidates.push(candidate);

    res.json(candidate);
 
});

app.put('/candidates/:id', (req, res) => {

    const id = req.params.id;

    console.log(req.params);
    const updatedCandidate = req.body;

    let candidateIndex = candidates.findIndex(candidate=> candidate.id === id);
    candidates[candidateIndex] = updatedCandidate; 

    res.json(candidates[candidateIndex]);
});

app.delete('/candidates/:id', (req, res) => {

    const id = req.params.id;

    console.log(req.params);
    let candidateIndex = candidates.findIndex(candidate => candidate.id === id);

    console.log(candidateIndex);
    if(candidateIndex !== -1 ) {
       candidates.splice(candidateIndex, 1);
       console.log(candidates);
    } 
    res.json("Deleted successfully");
});

// API endpoint to execute a specific Python function
app.get('/candidates', (req, res) => {
    res.json(candidates);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
