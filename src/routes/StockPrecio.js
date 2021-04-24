const express = require('express'),
        Stock_Precio = require('../models/Sku.model'),
        app= express();
const productosJson =require("../../stoks.json");
const Prueba = require("../../prueba.json");

app.get('/existencias', async(req,res)=>{

});

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
app.post('/Addjson',(req,res)=>{
    try {
        Prueba.forEach(element => {
            const newStoksJson={
                sku: element.sku,
                titulo: element.titulo,
                status: element.status,
                marca: element.marca,
                modelo: element.modelo,
                marketPlace: element.marketPlace
            }
            Stock_Precio.create(newStoksJson,(err,productoCreado)=>{
                if(err){
                    res.status(500).json({
                        ok: false,
                        message: "error al meter una lista de productos"
                    });
                }
                res.json({
                    ok:true,
                    menssage:"OK",
                    newStok
                });
            });
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            menssage: "UPS"
        });

    }
    
});
app.post('/new-product-json', async(req,res)=>{
    try {

            // productosJson.forEach(element => {
            //     let newStoksJson={
            //         sku: element.sku,
            //         titulo: element.titulo,
            //         status: element.status,
            //         marca: element.marca,
            //         modelo: element.modelo,
            //         marketPlace: element.marketPlace
            //     }
            //     console.log(`-----------------\n`+newStoksJson.sku);
            // });            
       

        const {sku,titulo,status, marca,modelo,marketPlace}=req.body;

        const newProduct = { ...req.body};

        let newStok = await Stock_Precio.create(newProduct);

        if (!newStok) {
            return res.status(500).json({
                success: false,
                message: 'UPS.. error al agregar el producto'
            })
        }
        return res.status(201).json({
            success: true,
            message: 'Se guardo exitosamente',
            newStok
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: '¡ERROR! Se esta duplicando un producto.json ya existen'

        })
    }
});
app.post('/crear', async (req, res) => {
    try {

        let stock = await Stock_Precio.create(req.body);

        //let stoksNum = await (await Stock_Precio.find()).length
        console.log("Productos registrados"+stoksNum);

        let newProduct = {
            sku: stock.sku,
            titulo: stock.titulo,
            status: stock.status,
            marca: stock.marca,
            modelo: stock.modelo,
            marketPlace: stock.marketPlace
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
    } catch (error) {
            return res.status(500).json({
                success: false,
                message: '¡ERROR! Se esta duplicando un producto ya existen'
            })
    }

    //console.log(newProduct.sku); //si lanza el sku que se inserta ^v^
    //let stockExist = await Stock_Precio.find(); //{sku:req.body.sku}
  
});

module.exports=app;
