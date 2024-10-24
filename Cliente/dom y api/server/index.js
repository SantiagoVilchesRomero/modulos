const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const MESSAGES = [
    {
        name : "Pepe",
    },
    {
        name : "Alejandro",
    },
    {
        name : "Santiago",
    },
    {
        name : "Fran",
    },
    {
        name : "Raul",
    }
]

app.use(cors());

app.get('/',(req,res)=>{
    res.send(JSON.stringify(MESSAGES));
});

app.listen(PORT);