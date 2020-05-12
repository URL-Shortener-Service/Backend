const express = require('express');
const controller = require('../controllers/url');
const userValidators = require('../validation/userValidation');


const router = express.Router();


router.post("/shorten", controller.CreateShortUrl)
router.get("/:code", controller.getShortLink)


module.exports = router