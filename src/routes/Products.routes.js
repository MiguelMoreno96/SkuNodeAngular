const express = require('express'),
        Stock_Products = require('../models/StockPrecie.model'),
        app= express();

app.get('/', async(req,res)=>{
    const product = await Stock_Products.find().populate('sku');
    console.log("producto X:"+product);
    if (!product) {
        res.status(500).json({
            ok: false,
            message: 'No se pudo....Intenta mas tarde'
        })
    }
    res.status(200).json({
        ok: true,
        message: 'Existentes',
        product
    })
});

app.get("/search/:id", async(req,res)=>{
    let id= req.params.id;
    const sp= await Stock_Products.findById(id)
    try {
        if(!sp){
            res.status(500).json({
                ok: false,
                message: 'No ese encontro ese producto'
            });
        }
        res.status(200).json({
            ok: true,
            sp
    
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            ok: false,
            menssage: 'Erro al tarer el equipo'
        });
    }


});

app.post('/add', async(req,res)=>{
    //try {

        let product = await (await Stock_Products.create(req.body)).populate('sku');

        console.log("producto Y:"+product);

        let PriceProm = {
            stock: product.stock,
            price: product.price,
            pricePromotion: product.pricePromotion,
            sku: product.sku
        }    
        console.log("Promocion: "+PriceProm);
        if (!PriceProm) {

            res.status(500).json({
                ok: false,
                message: 'Error al introducir nuevos precios y stoks'
            });
        }
        res.status(201).json({
            ok: true,
            PriceProm
        });
    /*} catch(error){
        return res.status(500).json({
            success: false,
            message: '¡ERROR! Se esta duplicando una oferta '
        })
    }*/
});
module.exports=app;