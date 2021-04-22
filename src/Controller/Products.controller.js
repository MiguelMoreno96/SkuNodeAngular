const StockProduct = require('../models/Sku.model');

exports.getAllProducts = async(req,res)=>{
    try {
        const stock = await StockProduct.find();

       if(!stock) return res.status(400).json({
           success: false,
           message: 'No hay datos de productos'
       })

       return res.status(200).json({
           success: true,
           count: stock.length,
           data: stock
       })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error en la peticion, Intentalo mas tarde'
        })
    }
}

exports.createProducts = async (req,res) => {
    try{

        const stock = await StockProduct.create(req.body);

        if(!Stock) return res.status(400).json({
            success: false,
            message: 'Error al Subir stock y precio'
        })

        return res.status(201).json({
            success: true,
            data: stock
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro en la peticion, Intentalo mas tarde'
        })
    }
}