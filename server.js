const express = require("express");
const colors = require('colors');
const cors = require('cors');
const mongoose = require('mongoose');
const path =require("path");
const producRoutes = require("./src/routes/StockPrecio");
const ProducPrecie = require("./src/routes/Products.routes")




const app = express();

// Middlewares
app.use(express.urlencoded({  extended: false  }));
app.use(express.json())
app.use(cors())

app.use('/productos',producRoutes);
app.use('/stoks', ProducPrecie);

const PORT = process.env.PORT || 3000;


// rutas
app.get('/',(req, res) => {
    res.status(200).json({
        success: true,
        message: 'Bienvenido' 
    })
})

//coneccion a la BD

mongoose.connect("mongodb://localhost:27017/StockPrecio", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(() => {
    console.log('base de Datos: \x1b[32m%s\x1b[0m', 'online');
}).catch((error) => console.log(error));


app.listen(PORT, () => console.log(`is running in port: ${PORT}`.green));