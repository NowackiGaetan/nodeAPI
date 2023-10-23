const express = require('express');
const connectDB = require("./config/db");
const dotenv = require('dotenv').config()
const Product = require('./models/productModel')
const app = express();
const port = 5000

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const productRoute = require('./routes/productRoute')
app.use('/products',productRoute);

// Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port  " + port));