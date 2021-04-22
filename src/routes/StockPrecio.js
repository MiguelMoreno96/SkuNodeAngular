const StockPrecie = require('../models/StockPrecie');

const express = require('express'),
        Stock_Precio = require('../models/StockPrecie'),
        app= express();


app.get('/', async (req,res) => {
    const stok = await Stock_Precio.find();
    if(!stok) {
        res.status(500).json({
            ok: false,
            message: 'no se pudo'
        })
    }

    res.status(200).json({
        ok: true,
        stok
    })
})


app.get("/search/:id", async(req,res)=>{
    let id= req.params.id;
    const sp= await Stock_Precio.findById(id)

   try{
    if(!sp){
        res.status(500).json({
            ok: false,
            message: `No ese encontro el Sku: ${id}`
        });
    }
    res.status(200).json({
        ok: true,
        sp

    });
   }catch(error){
    console.log(error.message);
        res.status(400).json({
            ok: false,
            menssage: 'Erro al tarer el equipo'
        });
    }
});


app.post('/crear', async (req, res) => {
    
    let stock = await Stock_Precio.create(req.body);
    
    let newProduct = {
        sku: stock.sku,
        titulo: stock.titulo,
        status: stock.status,
        marca: stock.marca,
        modelo: stock.modelo,
        marketPlace: stock.marketPlace
    }
    console.log(newProduct.sku); //si lanza el sku que se inserta ^v^
    let stockExist = await Stock_Precio.find(); //{sku:req.body.sku}

for (const existencias in stockExist) {
    if(newProduct == stockExist[existencias]){
        res.status(400).json({
            ok: false,
            message: '¡Error! No se puede duplicar un producto '
        }); 
    }
    //console.log(`producto ${existencias}: ${stockExist[existencias]}`)
    //console.log(`El producto ${existencias} no se parece con el ingresado `);
}

    if(!newProduct) {
        res.status(500).json({
            ok: false,
            message: 'Error al insertar un nuevo producto '
        });
    }

    res.status(201).json({
        ok: true,
        newProduct
    });
    
});

module.exports=app;
