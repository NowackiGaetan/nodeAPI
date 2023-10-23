const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');


//afficher produits
router.get('/',async(req,res) =>{
    try {
      const products = await productModel.find({})
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
})

//rechercher un produit par id
router.get('/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await productModel.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
  
//poster un produit
router.post('/', async(req,res)=>{
    try{
      const product = await productModel.create(req.body)
      res.status(200).json(product);
    }catch(err){
      console.log(err);
      res.status(500).json({message: err.message});
    }
})
  
//modifier un produit
router.put('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await productModel.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Produit non trouvé avec l'id ${id}`})
        }
        const updatedProduct = await productModel.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
  
//supprimer un produit
router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await productModel.findByIdAndDelete(id, req.body);
        if(!product){
            return res.status(404).json({message: `Produit supprimé avec l'id ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router