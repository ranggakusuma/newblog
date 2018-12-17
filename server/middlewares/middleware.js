let { verifyToken } = require('../helpers/helper')
const User = require('../models/User')
const Article = require('../models/Article')

module.exports = {
  authentication(req, res, next) {
    let token = req.headers.auth
    verifyToken(token, function (err, result) {
      if (err) {
        res.status(400).json({
          message: err.message
        })
      } else {
        User.findOne({
          email: result.email
        })
          .then((result_user) => {
            if (result_user) {
              req._currentUser = result_user
              next()
            } else {
              res.status(400).json({
                message: 'user not found'
              })
            }
          }).catch((err) => {
            res.status(400).json({
              message: err.message
            })
          });
      }
    })
  },
  articleOwner(req, res, next) {
    Article.findOne({
      _id: req.params.articleId,
      userId: req._currentUser._id
    })
      .then((result_article) => {
        if(result_article) {
          next()
        } else {
          res.status(400).json({
            message: 'You are not authorized!'
          })
        }
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }
}