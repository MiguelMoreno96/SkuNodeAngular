const mongoose = require('mongoose');

const SkuModel = new mongoose.Schema({
    sku:{
        type: String,
        require: [true, "Se require el SKU para el producto"],
        unique: true
    },
    titulo:{
        type: String,
        require:[true, "Se require el nombre del producto"]
    },
    status:{
        type: Boolean,
        require: true
    },
    marca:{
        type: String,
        require: [true, "Se require el nombre del producto"]
    },
    modelo: {
        type:String,
        require: true
    },
    marketPlace: {
        type: String,
        require: [true, "Se require el punto de venta del producto"]
    }
});

module.exports= mongoose.model("SkuModel", SkuModel);
