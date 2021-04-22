const mongoose = require('mongoose');

const StockPrecie = new mongoose.Schema({
    stock: {
        type: Number,
        required: [true, 'el stock es requerido para guardar'],
        trim: true
    },

    price: {
        type: Number,
        required: [true, 'el precio es requerido para guardar'],
        trim: true
    },

    pricePromotion: {
        type: Number,
        required: [true, 'el precio promoción es requerido para guardar'],
        trim: true
    },

    sku: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SkuModel",
        required: true
    }
});

module.exports= mongoose.model("StockPrecie", StockPrecie);
