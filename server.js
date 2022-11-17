
const express = require('express');
const app = express();
const  {randomUUID} = require('crypto');
const fs = require('fs');
app.use(express.json())

let products = [];

fs.readFile('dbtupiniquin.json', 'utf-8', (err, data)=>{
    if(err){
        console.log(err)
    }
    else{
        products= JSON.parse(data)
    }
})


app.post("/movies", (req, res) =>{
    const {name, soudtrack} = req.body;

    const product = {
        name,
        soudtrack,
        UUID: randomUUID(),
    } 

    

    createFile()
    res.send(product)
    
    res.status(200).end()
    
})

app.get("/listmovies", (req, res)=>{
    res.send(products)

})

app.get("/products/:UUID" ,(req, res )=>{
    const {UUID} = req.params; // UUID = parametros de requisição, ou seja, tudo o que o usuario digitar após o barra

    //metodo find percorre um array, parando no primqeiro resultado que satisfazer o teste, caso contrario retorna undefined
    console.log(UUID)
    const folha_amarela = products.find(numa_folha_amarela => numa_folha_amarela.UUID === UUID); 
    console.log(folha_amarela)
    return res.json(folha_amarela)
})  


app.put("/products/:UUID", (req, res)=>{
    
    const {UUID} = req.params;

    const {name,  soudtrack } = req.body;

//metodo findIndex retorna o primeiro indice de um array que satisfizer o teste
    const arrayposition = products.findIndex((element) => element.UUID === UUID)
    console.log(arrayposition)

    products[arrayposition] = {   
        ...products[arrayposition],
        name,
        soudtrack
    }
    createFile()
    res.send('ok') 
})



app.get("/test/:id",(req, res)=>{
     
    const {id} = req.params;
    const arrayposition = products.findIndex((element)=> element === id)

    console.log(arrayposition)
    res.send('ok')

} )




app.listen(4000, ()=>{
    console.log('NUMA FOLHA AMARELA AMARELAAA 4000');
})


app.delete('/products/:id',(req, res) =>{
    const {id} = req.params;
    const productIndex = products.findIndex((product)=>product.id ===id)
    products.splice(productIndex, 1)
    createFile()
    return res.json({Message: "product has been deleted"})
}) 
 


function createFile(){
    fs.writeFile('dbtupiniquin.json', JSON.stringify(products),(err)=>{
        if(err){
            console.log(err)
         }
        else{
            console.log('produto inserido')
        }
    })
}

/*
app.get("/mygirl/:id", (req, res)=>{

    const {id} = req.params

    console.log(id)

    res.send('where the sun dont have a shine')
})

*/
