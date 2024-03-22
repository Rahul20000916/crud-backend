const express = require("express");
const router = express.Router();
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const adminController = require("../controllers/adminController");


//ADMIN LOGIN PAGE
router.post("/login", adminController.doAdminLogin);

//PRODUCT ADDING
router.post('/add_product',upload.single( 'file' ), adminController.doAddProduct)

//GET PRODUCTS
router.get('/get_product', adminController.getAllProduct)

//DELETE PRODUCT
router.delete('/delete_product/:id', adminController.deleteProduct)

//GET PRODUCT
router.get("/product/:id", adminController.getProduct)

//UPDATE PRODUCT
router.put("/update_product/:id", adminController.updateProduct)

//GET MAILS
router.get("/get_messages", adminController.getMail)

//DELETE MAILS  
  router.delete("/delete_message/:id",adminController.deleteMail) 

module.exports = router;  