const express = require('express');
const connectDB = require("./config/db");
const dotenv = require('dotenv').config()
const Product = require('./models/productModel')
const app = express();
const port = 5000

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.get('/', function (req, res) {
  res.send('Hello World!');
});


//afficher produits
app.get('/products',async(req,res) =>{
  try {
    const products = await Product.find({})
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
})


//rechercher un produit par id
app.get('/products/:id', async(req, res) =>{
  try {
      const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
  } catch (err) {
      res.status(500).json({message: err.message})
  }
})

//poster un produit
app.post('/products', async(req,res)=>{
  try{
    const product = await Product.create(req.body)
    res.status(200).json(product);
  }catch(err){
    console.log(err);
    res.status(500).json({message: err.message});
  }
})

//modifier un produit
app.put('/products/:id', async(req, res) => {
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      if(!product){
          return res.status(404).json({message: `Produit non trouvé avec l'id ${id}`})
      }
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

//supprimer un produit
app.delete('/products/:id', async(req, res) => {
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndDelete(id, req.body);
      if(!product){
          return res.status(404).json({message: `Produit supprimé avec l'id ${id}`})
      }
      res.status(200).json(product);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port  " + port));