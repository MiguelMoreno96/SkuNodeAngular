const StockPrice = require('../models/StockPrecie');




exports.getAllStockPrice = async (req,res) => {
   try {
        const stockPrice = await StockPrice.find();

        if(!stockPrice) return res.status(400).json({
            success: false,
            message: 'No hay datos de stock y precio'
        })

        return res.status(200).json({
            success: true,
            count: stockPrice.length,
            data: stockPrice
        })
   } catch (error) {
       return res.status(500).json({
           success: false,
           message: 'Erro en la peticion, Intentalo mas tarde'
       })
   }
}

exports.createStockPrice = async (req,res) => {
    try{

        const stockPrice = await StockPrice.create(req.body);

        if(!StockPrice) return res.status(400).json({
            success: false,
            message: 'Error al Subir stock y precio'
        })

        return res.status(201).json({
            success: true,
            data: stockPrice
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro en la peticion, Intentalo mas tarde'
        })
    }
}
