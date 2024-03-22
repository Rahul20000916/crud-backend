const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


//NEWS LETTER SUBSCRIPTION
router.post("/user-subscribe", userController.subscribe);

//CONTACT
router.post("/user-contact", userController.contact)

module.exports = router;  