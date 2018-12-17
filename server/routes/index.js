var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('halaman index server')
});

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/verify', userController.verify)
 

module.exports = router;
