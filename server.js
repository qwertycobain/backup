const { json } = require('express');
const express = require('express');
const app = express();
const  {randomUUID} = require('crypto')

app.use(express.json())

const products = [];

app.post("/movies", (req, res) =>{
    const {name, soudtrack} = req.body;

    const product = {
        name,
        soudtrack,
        UUID: randomUUID(),
    }

    products.push(product)
    res.send(product)
    res.status(200).end()
})

app.listen(4000, ()=>{
    console.log('servidor rodando na porta 4000');
})


