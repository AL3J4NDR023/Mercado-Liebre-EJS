// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Controller Require ************
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images/products'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

var upload = multer({storage});

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', upload.single('image'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.patch('/edit/:id', upload.single('image'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
