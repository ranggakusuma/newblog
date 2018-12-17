var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController')
const {authentication, articleOwner} = require('../middlewares/middleware')
 
router.post('/', authentication, articleController.create)
router.get('/',  articleController.findAll)
router.get('/my',  authentication, articleController.findMyArticle)
router.get('/:articleId',  articleController.findOne)
router.put('/:articleId', authentication, articleOwner, articleController.update)
router.delete('/:articleId', authentication, articleOwner, articleController.delete)

module.exports = router;
