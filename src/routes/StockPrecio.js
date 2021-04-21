const StockPrecie = require('../Controller/StockPrecie');

const express = require('express'),
        Stock_Precio = require('../Controller/StockPrecie'),
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
    let {id}= req.params.id;
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
    let stockExist = await Stock_Precio.find({sku:req.body.sku});
    console.log("nuevo producto:" + stockExist);
    if(stockExist>0){
        res.status(400).json({
            ok: false,
            message: 'Error no se puede duplicar un  producto '
        })
    }
    if(!stock) {
        res.status(500).json({
            ok: false,
            message: 'Error al insertar un nuevo producto '
        });
    }

    res.status(201).json({
        ok: true,
        stock
    });
});

module.exports=app;